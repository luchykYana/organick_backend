const {Schema, model} = require('mongoose');

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    subscription: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('customer', customerSchema);