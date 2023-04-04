const path = require('path');
const fs = require('fs/promises');

const {errors, ErrorHandler} = require('../errors');
const {Product} = require('../dataBase');

const {NOT_VALID_BODY, NOT_FOUND_IMAGE, NOT_FOUND_BY_ID} = errors;

module.exports = {
    isProductBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isImageExist: async (req, res, next) => {
        try {
            const {image} = req.body;

            const imageFolder = path.join(path.parse(__dirname).dir, 'public', 'images');
            const files = await fs.readdir(imageFolder);

            if (!files.includes(image)) {
                throw new ErrorHandler(NOT_FOUND_IMAGE.message, NOT_FOUND_IMAGE.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkProductById: async (req, res, next) => {
        try {
            const {product_id} = req.params;

            const product = await Product.findById(product_id);

            if (!product) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);
            }

            req.product = product;

            next();
        } catch (e) {
            next(e);
        }
    },
};