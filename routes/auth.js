const express = require("express");
const router = express.Router();
const validator = require("../util/authValidator");
const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const config = require("config");


router.post("/", async (req, res, nxt) => {
    //check email
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(400).send("Invalid email or password");
        //check password
        const validPassword = bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password");
        //send res
        if (!config.get("JWT")) {
            console.log("");
            return res.status(500).send("NO TOKEN");
        }
        res.header("x-auth-token", user.getAuthToken());
        res.status(200).send("Logged in successfully");

    } catch (err) {
        nxt(err);
    }
});

module.exports = router;