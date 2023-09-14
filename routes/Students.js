const express = require("express");
const router = express.Router();
const studentsController = require("../controller/StudentsController");

router.get("/", studentsController.getAllStudents);

//Get Student By ID 
router.get("/:id", studentsController.getStudentById);

//Create New Student
router.post("/",studentsController.createNewStudent );

//Delete Student
router.delete("/:id",studentsController.deleteStudent);

//Update Student
router.put("/:id", studentsController.updateStudent);

module.exports = router;