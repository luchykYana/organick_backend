const router = require('express').Router();

const {productController} = require('../controllers');
const {productMiddleware} = require('../middlewares');
const {createProductValidator, updateProductValidator} = require('../validators/product.validator');

router.get(
    '/',
    productController.getProducts
);
router.post(
    '/',
    productMiddleware.isProductBodyValid(createProductValidator),
    productMiddleware.isImageExist,
    productController.createProduct
);

router.get(
    '/:product_id',
    productMiddleware.checkProductById,
    productController.getProductById
);
router.put(
    '/:product_id',
    productMiddleware.isProductBodyValid(updateProductValidator),
    productMiddleware.checkProductById,
    productController.updateProduct
);
router.delete(
    '/:product_id',
    productMiddleware.checkProductById,
    productController.deleteProduct
);

module.exports = router;