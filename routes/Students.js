const express = require("express");
const router = express.Router();
const studentsController = require("../controller/StudentsControllerDB");
const StudentValidator = require("../middlewares/StudentValidatorMW");
const auth = require("../middlewares/AuthMWPermission")
router.get("/", studentsController.getAllStudent);

//Get Student By ID 
router.get("/:id", studentsController.getStudentById);

//Create New Student
router.post("/", StudentValidator, auth, studentsController.addNewStudent);

//Delete Student
router.delete("/:id", auth, studentsController.deleteStudentById);

//Update Student
router.put("/:id", studentsController.updateStudentById);

//Middleware for id 
router.param("id", (req, res, nxt, val) => {
    if (/^[0-9a-fA-F]{24}$/.test(val)) {
        req.id = val;
        nxt();
    } else {
        res.status(400).send("Invalid ID");
    }
});



module.exports = router;