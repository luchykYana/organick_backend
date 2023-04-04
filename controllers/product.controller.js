const {Product} = require('../dataBase');

module.exports = {
    getProducts: async (req, res, next) => {
        try {
            const products = await Product.find();

            res.json(products);
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const product = req.body;

            const newProduct = await Product.create(product);

            res.json(newProduct);
        } catch (e) {
            next(e);
        }
    },

    getProductById: (req, res, next) => {
        try {
            const {product} = req;

            res.json(product);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {product_id} = req.params;
            const product_body = req.body;

            const product = await Product.findByIdAndUpdate(product_id, product_body, {new: true});

            res.json(product);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.product;

            await Product.findByIdAndDelete({_id: id});

            res.json('Product is deleted!');
        } catch (e) {
            next(e);
        }
    }
}