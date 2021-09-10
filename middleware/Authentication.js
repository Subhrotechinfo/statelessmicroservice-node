const jwt = require("jsonwebtoken");
const key = require("../config/application").key;
const _ = require("lodash");

exports.isAdminAuthorized = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            // Merchant
            if (!_.isEmpty(req.headers.authorization)) {
                let decoded = jwt.verify(req.headers.authorization, key);
                if (decoded) {
                    if (decoded.role == 'Admin')
                        next();
                    else {
                        return res.status(402).json({
                            success: false,
                            message: "Unauthorised",
                            data: {}
                        });
                    }
                } else {
                    return res.status(402).json({
                        success: false,
                        message: "Unauthorised",
                        data: {}
                    });
                }
            } else {
                return res.status(421).json({
                    success: false,
                    message: "Invalid token",
                    data: {},
                });
            }

        } else {
            return res.status(421).json({
                success: false,
                message: "Please send token in headers.",
                data: {},
            });
        }
    } catch (error) {
        console.log("error authorization-", error);
        return res.status(500).json({
            success: false,
            message: "Error occured in Middleware.",
            data: {},
        });
    }
}
exports.isAuthorized = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            // Merchant
            if (!_.isEmpty(req.headers.authorization)) {
                let decoded = jwt.verify(req.headers.authorization, key);
                if (decoded) {
                    if (decoded.role == 'Student')
                        next();
                    else {
                        return res.status(402).json({
                            success: false,
                            message: "Unauthorised",
                            data: {}
                        });
                    }
                } else {
                    return res.status(402).json({
                        success: false,
                        message: "Unauthorised",
                        data: {}
                    });
                }
            } else {
                return res.status(421).json({
                    success: false,
                    message: "Invalid token",
                    data: {},
                });
            }

        } else {
            return res.status(421).json({
                success: false,
                message: "Please send token in headers.",
                data: {},
            });
        }
    } catch (error) {
        console.log("error authorization-", error);
        return res.status(500).json({
            success: false,
            message: "Error occured in Middleware.",
            data: {},
        });
    }
}