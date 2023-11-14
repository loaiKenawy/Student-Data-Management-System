const jwt = require("jsonwebtoken");

module.exports = (req, res, nxt )=> {
    //check user role
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Access Denied..");
    try {
        const decodedPayload = jwt.verify(token, config.get("JWT"));
        if(!decodedPayload.adminRole){
            return res.status(401).send("Access Denied..");
        }
    } catch (err) {
        res.status(400).send("Invalid Token..");
    }

}