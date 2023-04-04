const router = require('express').Router();

const {categoryController} = require('../controllers');
const {categoryMiddleware} = require('../middlewares');
const {createCategoryValidator} = require('../validators/category.validator');

router.get(
    '/',
    categoryController.getCategories
);
router.post(
    '/',
    categoryMiddleware.isCategoryBodyValid(createCategoryValidator),
    categoryMiddleware.createId,
    categoryController.createCategory
);

router.get(
    '/:category_id',
    categoryMiddleware.checkCategoryById,
    categoryController.getCategoryById
);
router.put(
    '/:category_id',
    categoryMiddleware.isCategoryBodyValid(createCategoryValidator),
    categoryMiddleware.checkCategoryById,
    categoryController.updateCategory
);
router.delete(
    '/:category_id',
    categoryMiddleware.checkCategoryById,
    categoryController.deleteCategory
);

module.exports = router;