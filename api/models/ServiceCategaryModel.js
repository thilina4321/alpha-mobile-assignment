var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceCategaryModelSchema = new Schema({
    categary: {
        type: String,
        required: [true, 'Categary field is required!']
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const ServiceCategary = mongoose.model('ServiceCategary', ServiceCategaryModelSchema);
module.exports = { ServiceCategary }