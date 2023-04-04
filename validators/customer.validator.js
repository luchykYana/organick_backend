const Joi = require('joi');

const createCustomerValidator = Joi.object({
    email: Joi
        .string()
        .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
        .trim()
        .required(),
    subscription: Joi
        .boolean()
        .default(false)
});

const updateCustomerValidator = Joi.object({
    subscription: Joi
        .boolean()
        .required()
});


module.exports = {
    createCustomerValidator, updateCustomerValidator
};