const { Service } = require("../models/ServiceModel");
const { ServiceCategary } = require("../models/ServiceCategaryModel");
const { Appoinment } = require("../models/Appoinment");
const { Payment } = require("../models/PaymentsModel");

exports.createServiceCategary = (req, res) => {                                                 //create service categary
    var newServiceCategary = new ServiceCategary(req.body);

     newServiceCategary.save((err, serviceCategary) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create service categary!",
                data: err 
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New service categary is created!",
                data: serviceCategary
            });
        }
    });
};

exports.getAllServiceCategary = (req, res) => {                                         // view service categary
    ServiceCategary.find(function(err, ServiceCategary) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive service Categary!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received service Categary!",
            data: ServiceCategary
        });
    });
};

exports.createService = async (req, res) => {                                                          // create service
    await ServiceCategary.findById(req.body.ServiceCategary, async function(err, ServiceCategary) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service categary id!"
            });
        }

        

        var newService = new Service(req.body);

        newService.serviceAgent_id = req.user._id;

        await newService.save((err, service) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create service!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New service is created!",
                    data: service
                });
            }
        });
    });
};

exports.getAllServices = async (req, res) => {                         // view service
    await Service.find(function(err, Services) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive services!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received services!",
            data: Services
        });
    });
};

exports.getServiceById = async (req, res) => {                                         //view service by id
    await Service.findById(req.params.id, async function(err, Service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        

        return res.status(200).json({
            success: true,
            message: "Service received!",
            data: Service
        });
    });
};

exports.updateService = async (req, res) => {                                      //update service
    await Service.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, Service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

       

        return res.status(422).json({
            success: true,
            message: "Service updated!",
            data: Service
        });
    });
};

exports.deleteService = async (req, res) => {                                     //delete service
    await Service.remove({_id: req.params.id}, function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service deleted!"
        });
    });
};

exports.viewappoinment = async (req, res) => {                                    //view appoinment
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
            message: "Received Appoinment!",
            data: Appoinment
        });
    });
};

exports.appoinmentstatusupdate = async (req, res) => {                            //update appoinment
    let {status } = req.body 
     await Appoinment.findOneAndUpdate({_id: req.params.id},{status } , {new: true}, function(err, Appoinment) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

       

        return res.status(422).json({
            success: true,
            message: "Appoinment is accepted!",
            data: Appoinment
        });
    });
};

exports.viewpayment = async (req, res) => {                                    //view Payment
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
            message: "Received Payment!",
            data: Payment
        });
    });
};

exports.collectpayment = async (req, res) => {                             //update payment
    let {status } = req.body 
     await Payment.findOneAndUpdate({_id: req.params.id},{status } , {new: true}, function(err,Payments) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

       

        return res.status(422).json({
            success: true,
            message: "Payment is received!",
            data: Payments
        });
    });
};