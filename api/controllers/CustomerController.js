const { Service } = require("../models/ServiceModel");
const { Appoinment } = require("../models/Appoinment");
const { Payment } = require("../models/PaymentsModel");

exports.searchServices = async (req, res) => {                        // search service
    await Service.find(function(err, Service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to received Services!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received Services!",
            data: Service
        });
    });
};



exports.createappoinment = (req, res) => {                                              //create appoinment
    var newAppoinment = new Appoinment(req.body);

     newAppoinment.save((err, appoinment) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create appoinment!",
                data: err 
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New appoinment is created!",
                data: appoinment
            });
        }
    });
}; 

exports.viewappoinmentstatus = async (req, res) => {                          // view appoinment status
    await Appoinment.find(function(err, Appoinment) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive appoinment!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Appoinment is accepted!, Pleace pay your amount.",
            data: Appoinment
        });
    });
};

exports.payment = (req, res) => {                                                //pay payment
    var newPayment = new Payment(req.body);

     newPayment.save((err, Payment) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create payment!",
                data: err 
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New payment is created!",
                data: Payment
            });
        }
    });
}; 

exports.viewpaymentstatus = async (req, res) => {                          // view appoinment status
    await Payment.find(function(err, Payment) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive payment!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Payment is received,Please come with on time.Thankyou for you using our service.come again!",
            data: Payment
        });
    });
};