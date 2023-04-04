const Joi = require('joi');

const goodsItemValidator = Joi.object({
    product_id: Joi
        .string()
        .min(24)
        .max(24)
        .required(),
    amount: Joi
        .number()
        .min(1)
        .required()
});

const customerInfoValidator = Joi.object({
    full_name: Joi
        .string()
        .min(5)
        .max(50)
        .trim()
        .pattern(/^[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2}$/)
        .required(),
    address: Joi
        .string()
        .min(5)
        .max(50)
        .trim()
        .required(),
    phone_number: Joi
        .string()
        .min(9)
        .max(20)
        .trim()
        .required(),
    message: Joi
        .string()
        .min(0)
        .max(500)
        .default('')
        .trim()
});

const createOrderValidator = Joi.object({
    total_price: Joi
        .number()
        .min(0)
        .required(),
    discount: Joi
        .number()
        .min(0)
        .required(),
    goods: Joi
        .array()
        .items(goodsItemValidator)
        .min(1)
        .required(),
    customer_info: customerInfoValidator
});

module.exports = {
    createOrderValidator
};