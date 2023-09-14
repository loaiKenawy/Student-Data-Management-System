const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const studetnsRouter = require("./routes/Students");
const logging = require("./middlewares/logging");


const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());// 3rd partty middleware.
app.use(logging);//Custom middleware
app.use("/api/students",studetnsRouter);

app.listen(port, () => console.log(`Listeing ${port}...`));

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
    res.send(`Thanks ${req.body.fnm} ${req.body.lnm} For Submiting :)`);
});


app.get("/abc", (req, res) => {
    console.log(req.cookies.FirstName);
    console.log(req.cookies.UserAge);
    res.sendStatus(200);
});

//app setting
app.set("template engine","ejs");