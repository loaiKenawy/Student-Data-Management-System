const fileSystem = require("fs");
const path = require("path");
const studentPath = path.join(path.dirname(process.mainModule.filename), "data", "Students.json");
module.exports = class Student {
    constructor(nm, dept) {
        this.name = nm;
        this.dept = dept;

    }
    saveStudent() {
        //Students.push(this);
        fileSystem.readFile(studentPath, (err, info) => {
            let students = [];
            if (!err) {
                students = JSON.parse(info);
                this.id = students.length + 1;
                students.push(this);
                fileSystem.writeFile(studentPath, JSON.stringify(students), (err) => { console.log("Error") });
            }
        })

    }
    static fetchAllStudents(callBack) {
        //return Students;
        fileSystem.readFile(studentPath, (err, info) => {
            if (!err) {
                callBack(JSON.parse(info));
            }
            else
            callBack([]);
        })
    }
}