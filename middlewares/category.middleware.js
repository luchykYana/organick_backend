const {errors, ErrorHandler} = require('../errors');
const {Category} = require('../dataBase');

const {NOT_VALID_BODY, NOT_FOUND_BY_ID} = errors;

module.exports = {
    isCategoryBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.name = value.name;

            next();
        } catch (e) {
            next(e);
        }
    },

    createId: async (req, res, next) => {
        try {
            const categories = await Category.find();

            const maxObject = categories.reduce((max, obj) => obj.category_id > max.category_id ? obj : max, {category_id: 0});

            req.id = maxObject.category_id + 1;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCategoryById: async (req, res, next) => {
        try {
            const {category_id} = req.params;

            const category = await Category.find({category_id});

            if (!category[0]) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);
            }

            req.category = category[0];

            next();
        } catch (e) {
            next(e);
        }
    },
};