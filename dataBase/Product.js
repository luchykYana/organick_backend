const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    product_description: {
        type: String,
        required: true,
        trim: true
    },
    additional: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('product', productSchema);