var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var  AppoinmentModelSchema = new Schema({
    service_category: {
        type: String,
        required: [true, 'Service Category field is required!']
    },
    vehicle_type: {
        type: String,
        required:[true, 'Vehicle type field is required!']
    },
    vehicle_number: {
        type: String,
        required: [true, 'Vehicle number field is required!']
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Customer field is required!']
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Service field is required!']
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Reject', 'Completed'],
        required: [true, 'Status field is required!'],
        default: "Pending"
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Appoinment = mongoose.model('Appoinment', AppoinmentModelSchema);
module.exports = { Appoinment }