var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceAgentModelSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'User field is required!']
    },
    
    create_date: {
        type: Date,
        default: Date.now
    }
});

const ServiceAgent = mongoose.model('ServiceAgent', ServiceAgentModelSchema);
module.exports = { ServiceAgent }