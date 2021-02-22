const { User } = require("../models/UserModel");

exports.registerUser =  (req, res) => {              //new user registor    
    const user = new User(req.body);

     user.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Registration failed, Check the validation errors!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully Signed Up!"
            });
        }
    });
};

exports.loginUser =  (req, res) => {                            //login user
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user) {
            return res.status(404).json({
                suceess: false,
                message: "User email not found!"
            });     
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Password is incorrect!"
                });
            }

            user.generateToken((err, token) => {
                if(err) {
                    return res.status(400).json({
                        success: false,
                        message: "Unable to generate jwt key!",
                        data:err 
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: "Successfull logged in!",
                    data: {
                        "token": token               //user details token
                    }
                });
            });
        });
    });
};

exports.getUserDeatils =  (req, res) => {                //get user datails                 
     return res.status(200).json({
         success: true,
         message: "User received!",
         data: req.user
     });      
} 