const mongoose = require("mongoose");
const valid = require("validator");
const jwt = require("jsonwebtoken");
const config = require("config");


//crate user schema

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        validate: (val) => { return valid.isEmail(val); },
        message: `{VALUE} is not valid email`
    },
    isAdmin: {
        type: Boolean

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, { collection: 'Users' });

userSchema.method("getAuthToken", function () {

    const token = jwt.sign({ uerid: this._id, adminRole: this.isAdmin }, config.get("JWT"));
    return token;
});

const User = mongoose.model("Users", userSchema);
exports.User = User;