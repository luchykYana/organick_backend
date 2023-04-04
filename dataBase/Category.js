const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    category_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('category', categorySchema);