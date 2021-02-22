const { User } = require("../models/UserModel");
const UserRole = require('../enums/UserRole');

const ServiceAgent = (req, res, next) => {
    let token = req.header("authorization");

    if(!token) {
        return res.status(400).json({
            success: false,
            message: "No valid token provided!"
        });
    }

        User.findByToken(token, (err, user) => {
            if (err) throw err;
            
            if (user.role != UserRole.SERVICEAGENT) {
               return  res.status(403).json({
                    success: false,
                    message: "No authorization to access this route!"
                });
            }

            next();
        });
    
};

module.exports = { ServiceAgent };