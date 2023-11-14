const express = require("express");
const router = express.Router();
const { User } = require("../models/UserModel");
const auth = require("../middlewares/AuthMWPermission")

router.put("/:id",auth, async (req, res,nxt) => {

    try {
        const dbRes = await User.findByIdAndUpdate({ _id: req.params.id }, { isAdmin: true });
        if (dbRes) {
            console.log(`dbRes: ${dbRes}`)
            res.status(200).send("User Role is set to Admin..");
        } else {
            console.log(`dbRes: ${dbRes}`)
            res.status(400).send("User Not Found");
        }

    } catch (err) {
        nxt(err);
    }
});

module.exports = router;