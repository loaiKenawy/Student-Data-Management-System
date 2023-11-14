const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const validator = require("../middlewares/UserMWValidator");
const { User } = require("../models/UserModel");
//Registration
router.post("/", validator, async (req, res, nxt) => {
    //check already exists 
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).send("User already Registered!");
    //create new user
    try {
        let salt = await bcrypt.genSalt(10);
        let hashedPwd = (await bcrypt.hash(req.body.password, salt)).toString();
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd
        });
        await user.save();
        res.status(200).send("Done");

    } catch (err) {
        nxt(err);
    }
});


module.exports = router;