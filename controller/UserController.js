const key = require("../config/application").key;
var _ = require('lodash');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.UserLogin = async (req, res) => {
    try {
        let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm);
        if (_.isEmpty(req.body.username))
            return res.status(422).json({ "success": false, "msg": "Username is required parameter.", data: {} });
        if (_.isEmpty(req.body.password))
            return res.status(422).json({ "success": false, "msg": "Password is required parameter.", data: {} });
        let regexTest = regex.test(req.body.password)
        if (regexTest == false)
            return res.status(422).json({ "success": false, "msg": "Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.", data: {} });
        if (_.isEmpty(req.body.role))
            return res.status(422).json({ "success": false, "msg": "Role is required parameter.", data: {} });
        if (!['Admin', 'Student'].includes(req.body.role))
            return res.status(422).json({ "success": false, "msg": "Role should be either Admin/Student.", data: {} });

        // Not storing any data in the Database in actual need to store and check if user exist - arbitrary username/password pair
        const payload = {
            name: req.body.username,
            role: req.body.role
        }; // Create JWT Payload
        // Sign Token
        jwt.sign(payload, key, { expiresIn: 360000 }, async (err, token) => {
            return res.status(200).json({
                msg: "Login successful",
                success: true,
                token: token
            });
        });
    } catch (error) {
        console.error('error-', error)
        res.status(500).json({ "success": false, "msg": "Server Error" });
    }
}


