var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const SALT = 10;

var PaymentModelSchema = new Schema({
    appoinment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appoinment',
        required: [true, 'Appoinment field is required!']
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Customer field is required!']
    },
    vehicle_number: {
        type: String,
        required: [true, 'Vehicle number field is required!']
    },
    bank: {
        type: String,
        required: [true, 'Bank field is required!']
    },
    bank_branch: {
        type: String,
        required: [true, 'Bank branch field is required!']
    },
    account_number: {
        type: String,
        required: [true, 'Account number field is required!']
    },
    amount: {
        type: String,
        required: [true, 'Amount field is required!']
    },
    
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Failed', 'Completed'],
        required: [true, 'Status field is required!'],
        default: "Processing"
    },    
   
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Saving payments data
PaymentModelSchema.pre('save', function (next) {
    var payment = this;
    if(payment.isModified('account_number')) {
        //checking if account number field is avilable and modified
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(payment.account_number, salt, function (err, hash) {
                if (err) return next(err)
                payment.account_number = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const Payment = mongoose.model('Payment', PaymentModelSchema);
module.exports = { Payment }