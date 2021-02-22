module.exports = function(app) {
    const { Auth } = require("../middleware/auth");
    const { Customer } = require("../middleware/customer");

    const CustomerController = require("../controllers/CustomerController");
    
    
    app.get("/search_services", [Auth, Customer], CustomerController.searchServices);            // search all service
    app.post("/creat_appoinment",[Auth,Customer],CustomerController.createappoinment);           // create appoinment
    app.get("/viewappoinmentstatus",[Auth,Customer],CustomerController.viewappoinmentstatus);    // view appoinment status
    app.post("/payment",[Auth, Customer],CustomerController.payment);                            // pay payments
    app.get("/viewpaymentstatus",[Auth,Customer ],CustomerController.viewpaymentstatus); 
};