const { User } = require('../models/UserModel');

const Auth = (req, res, next) => {
    let token = req.header("authorization");

    if(!token) {
        return res.status(400).json({
            success: false,
            message: "No valid token provided!"
        });
    }

    User.findByToken(token, (err, user) => {
        if(err) {
            throw err;
        }

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "No valid token provided!",
                data: err 
            });
        }

        req.token = token;
        req.user = user;

        next();
    });    
    
};

module.exports = { Auth };