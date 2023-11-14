const express = require("express");
const app = express();

const path = require("path");
const helmet = require("helmet");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/User");
const studentsRouter = require("./routes/Students");
const logging = require("./middlewares/logging");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/Admin");
const errMW = require("./middlewares/ErrorMW");
const port = process.env.PORT || 3000

process.on("uncaughtException" , (exception)=>{
    console.log("uncaughtException" +exception);
    process.exit(1);
});

process.on("unhandledRejection" , (exception)=>{
    console.log("unhandledRejection" +exception);
    process.exit(1);
});


app.set("template engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(helmet());// 3rd party middleware.
//app.use(logging);//Custom middleware

app.use("/api/students", studentsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", authRouter);
app.use("/api/admin", adminRouter);
app.use(errMW);

app.listen(port, () => console.log(`Listening on port: ${port}`));

mongoose.connect('mongodb://127.0.0.1:27017/Test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res, nxt) => {
    console.log("first stage ");
    nxt();
}, (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, "/main.html"));
});

app.get("/welcome.html", (req, res) => {
    console.log(req.query);
    console.log(req.query.fnm);
    console.log(req.query.lnm);
    res.sendFile(path.join(__dirname, "/welcome.html"));
});

//REQ body
app.post("/welcome.html", (req, res) => {
    console.log(req.body);
    res.cookie("FirstName", Buffer.from(req.body.fnm).toString('base64'));
    res.cookie("UserAge", 25, { httpOnly: true });
    res.send(`Thanks ${req.body.fnm} ${req.body.lnm} For Submitting :)`);
});


app.get("dummy", (req, res) => {
    console.log(req.cookies.FirstName);
    console.log(req.cookies.UserAge);
    res.sendStatus(200);
});



