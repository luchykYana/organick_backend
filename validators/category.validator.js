const Joi = require('joi');

const createCategoryValidator = Joi.object({
    name: Joi
        .string()
        .min(2)
        .max(30)
        .trim()
        .required(),
});

module.exports = {
    createCategoryValidator
};
