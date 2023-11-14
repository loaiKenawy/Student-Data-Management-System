const Student = require("../models/StudentModelDB");
const asyncFunction = require("../middlewares/async");


//create
let addNewStudent = (req, res, nxt) => {
    try {
        let std = new Student({
            name: req.body.name,
            dept: req.body.dept,
            id: req.body.id
        })

        std.save().then(() => {
            res.send(std)
        }).catch((err) => {
            nxt(err);
        })
    }
    catch (err) {
        nxt(err);
    }
}

//get by id
let getStudentById = asyncFunction(async (req, res) => {
    let std = await Student.findById(req.params.id);
    if (!std) return res.status(404).send("This ID was not found  !");
    res.send(std);
});


//get all
let getAllStudent = asyncFunction(async (req, res) => {
    let stds = await Student.find().sort({ id: 1 });
    if (!stds) return res.status(404).send("No Students Found !");
    res.send(stds);
})

//update
let updateStudentById = asyncFunction(async (req, res) => {

    let std = await Student.findByIdAndUpdate(req.params.id, req.body, {
        returnOriginal: false
    });
    if (!std) return res.status(404).send("Student not found");
    res.send(std);

})


//delete
let deleteStudentById = asyncFunction(async (req, res) => {

    let std = await Student.findByIdAndDelete(req.params.id);
    if (!std) return res.status(404).send("Student not found");
    res.send(std);
})

module.exports = {
    deleteStudentById,
    updateStudentById,
    getAllStudent,
    getStudentById,
    addNewStudent
}