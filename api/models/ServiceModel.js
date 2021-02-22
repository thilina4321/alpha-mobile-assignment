var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { ServiceCategary } = require("./ServiceCategaryModel");


var ServiceModelSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required!']
    },
    description: {
        type: String,
        required: [true, 'Description field is required!']
    },
    image: {
        type: String
    },
    service_category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: ServiceCategary,
        required: [true, 'Categary field is required!']
    },
    price: {
        type: String,
        required: [true, 'Price field is required!']
    },
    
    ServiceAgent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceAgent',
        required: [true, 'ServiceAgent field is required!']
    },
    
    created_date: {
        type: Date,
        default: Date.now
    }
});

ServiceModelSchema.index({
    title: 'text',
    description: 5,
},{
    weights: {
        title: 3,
        description: 5,
    },
});

const Service = mongoose.model('Service', ServiceModelSchema);
module.exports = { Service }