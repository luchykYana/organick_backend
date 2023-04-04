const {Schema, model} = require('mongoose');

const goodsItemSchema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
});

const customerInfoSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
});

const orderSchema = new Schema({
    customer_id: {
        type: String,
        required: true,
        trim: true
    },
    total_price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    goods: {
        type: [goodsItemSchema],
        required: true
    },
    customer_info: {
        type: customerInfoSchema,
        required: true
    },

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('order', orderSchema);