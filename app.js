const express = require("express");
const path = require("path");
const app = express();
const Ajv = require("ajv");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const ajv = new Ajv();

const port = process.env.PORT || 3000




const students = [
    { name: 'Ahmed', dept: 'cs', id: 1 },
    { name: 'Mo', dept: 'cs', id: 2 },
    { name: 'Ali', dept: 'cs', id: 3 },
    { name: 'Marc', dept: 'cs', id: 4 }]

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "dept": {
            "type": "string",
            "maxLength": 3,
            "minLength": 2
        }
    },
    "required": ["name", "dept"],
    "maxProperties": 2,
    "minProperties": 2,
};

const validator = ajv.compile(schema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(helmet());// 3rd partty middleware.

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

app.get("/api/students", (req, res) => {
    //res.json(students);
    res.render("Students.ejs",{std:students});
});

//prameter middleware
app.param("id", (req, res, nxt, val) => {
    //validation of paramter
    if (Number(val)) {
        //add pram as prop for req
        req.id = val;
        nxt();
    }
    else {
        res.send("Invalid ID!");
    }
});

//Request student by ID
//passing data from clint to server using URL parameters 
app.get("/api/students/:id", (req, res) => {
    //const id = req.params.id;
    let id = req.id;
    const student = students.find((val, idx, arr) => {
        return val.id == id;
    });
    if (student)
        res.json(student);
    else
        res.send(`Can't find student ${id}`)
});

//Create New Student
app.post("/api/students", (req, res) => {
    if (validator(req.body)) {

        req.body.id = students.length + 1;
        students.push(req.body);
        res.json(req.body);
    }
    else {
        res.sendStatus(403);
    }
});

//Delete Student
app.delete("/api/students/:id", (req, res) => {
    let indx = students.findIndex((val) => {
        return val.id == req.params.id
    });
    if (indx != -1) {
        let deletedStd = students.splice(indx, 1);
        res.send("One Element Deleted");
    } else {
        res.send("student not found");
    }

});

//Update Student
app.put("/api/students/:id", (req, res) => {

    let indx = students.findIndex((val) => {
        return val.id == req.params.id
    });

    if (indx != -1) {
        for (i in req.body) {
            students[indx][i] = req.body[i];
        }
        res.json(students[indx]);

    } else {
        res.send("student not found");
    }
});