const Joi = require('joi');

const createProductValidator = Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .required(),
    description: Joi
        .string()
        .min(10)
        .max(200)
        .trim()
        .required(),
    product_description: Joi
        .string()
        .min(10)
        .max(500)
        .trim()
        .required(),
    additional: Joi
        .string()
        .min(10)
        .max(500)
        .trim()
        .required(),
    category: Joi
        .number()
        .min(1)
        .max(100)
        .required(),
    image: Joi
        .string()
        .required(),
    rating: Joi
        .number()
        .min(1)
        .max(5)
        .required(),
    price: Joi
        .number()
        .min(1)
        .max(1000)
        .required(),
    discount: Joi
        .number()
        .min(0)
        .max(100)
});

const updateProductValidator = Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(30)
        .trim(),
    description: Joi
        .string()
        .min(10)
        .max(200)
        .trim(),
    product_description: Joi
        .string()
        .min(10)
        .max(500)
        .trim(),
    additional: Joi
        .string()
        .min(10)
        .max(500)
        .trim(),
    category: Joi
        .number()
        .min(1)
        .max(100),
    image: Joi
        .string(),
    rating: Joi
        .number()
        .min(1)
        .max(5),
    price: Joi
        .number()
        .min(1)
        .max(1000),
    discount: Joi
        .number()
        .min(0)
        .max(100)
});

module.exports = {
    createProductValidator,
    updateProductValidator
};