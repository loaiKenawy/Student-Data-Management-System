const validator = require("../util/StudentValidator");
const Student = require("../models/StudentModle");


const getAllStudents = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    //res.json(students);
    Student.fetchAllStudents((obj) => {
        res.render("Students.ejs", {
            std: obj
        });
    });

}


const getStudentById = (req, res) => {
    Student.fetchAllStudents((obj) => {
        let indx = obj.findIndex((val) => {
            return val.id == req.params.id
        });
        if (indx != -1) {
            res.json(obj[indx]);
        } else {
            res.send("student not found");
        }
    });
}

const createNewStudent = (req, res) => {
    if (validator(req.body)) {
        let std = new Student(req.body.name, req.body.dept);
        std.saveStudent()
        res.json(req.body);
    }
    else {
        res.sendStatus(403);
    }
}


const deleteStudent = (req, res) => {
    //Not Updated logic 
    let indx = students.findIndex((val) => {
        return val.id == req.params.id
    });
    if (indx != -1) {
        let deletedStd = students.splice(indx, 1);
        res.send("One Element Deleted");
    } else {
        res.send("student not found");
    }

}

const updateStudent = (req, res) => {
    //Not Updated logic 
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
}

module.exports = { getAllStudents, getStudentById, createNewStudent, deleteStudent, updateStudent };