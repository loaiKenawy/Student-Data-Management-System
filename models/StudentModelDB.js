const mongoose = require('mongoose');

//Schema 
const studentSchema = new mongoose.Schema({
    name: String,
    dept: {
        type: String,
        required: true,
        match: /^[SM][AD]$/
    },
    id: {
        type: Number,
        unique: true,
        required: true,
        min: 30,
        max: 3000
    }
}, { collection: 'Students' });

//Model
const Student = mongoose.model("Students", studentSchema);
module.exports = Student;