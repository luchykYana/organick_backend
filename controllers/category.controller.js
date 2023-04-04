const {Category} = require('../dataBase');

module.exports = {
    getCategories: async (req, res, next) => {
        try {
            const categories = await Category.find();

            res.json(categories);
        } catch (e) {
            next(e);
        }
    },

    createCategory: async (req, res, next) => {
        try {
            const {name, id} = req;

            const newCategory = await Category.create({name, category_id: id});

            res.json(newCategory);
        } catch (e) {
            next(e);
        }
    },

    getCategoryById: (req, res, next) => {
        try {
            const {category} = req;

            res.json(category);
        } catch (e) {
            next(e);
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            const {id} = req.category;
            const category_body = req.body;

            const category = await Category.findByIdAndUpdate(id, category_body, {new: true});

            res.json(category);
        } catch (e) {
            next(e);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const {id} = req.category;

            await Category.findByIdAndDelete(id);

            res.json('Category is deleted!');
        } catch (e) {
            next(e);
        }
    }
}