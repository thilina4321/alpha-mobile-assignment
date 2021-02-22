module.exports = function(app) {
    const { Auth } = require("../middleware/auth");
    const { ServiceAgent } = require("../middleware/serviceagent");

    const ServiceAgentController = require("../controllers/ServiceAgentController");

    app.post("/create_service_categary", [Auth, ServiceAgent ], ServiceAgentController.createServiceCategary);   //create the service catergary 
    app.get("/service_categary", [Auth, ServiceAgent], ServiceAgentController.getAllServiceCategary);            // view the all service catergary has they user id
    app.post("/create_service", [Auth, ServiceAgent], ServiceAgentController.createService);                     // create the service
    app.get("/services", [Auth, ServiceAgent], ServiceAgentController.getAllServices);                                         // view the all service the has create     
    app.get("/service/:id", [Auth, ServiceAgent], ServiceAgentController.getServiceById);                      // view the what are the you create service
    app.put("/update_service/:id", [Auth, ServiceAgent], ServiceAgentController.updateService);                // update the service
    app.delete("/delete_service/:id", [Auth, ServiceAgent], ServiceAgentController.deleteService);             // delete the service
    app.get("/viewappoinment",[Auth,ServiceAgent ],ServiceAgentController.viewappoinment);                     // view the appoinment
    app.patch("/appoinmentstatusupdate/:id",[Auth,ServiceAgent],ServiceAgentController.appoinmentstatusupdate);  // update the appoinment status
    app.get("/viewpayment",[Auth,ServiceAgent ],ServiceAgentController.viewpayment);                             //view payments
    app.patch("/collectpayment/:id", [Auth, ServiceAgent], ServiceAgentController.collectpayment);               //collect payments
}