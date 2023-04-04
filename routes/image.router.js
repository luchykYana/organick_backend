const router = require('express').Router();

const {imageController} = require('../controllers');

router.get(
    '/:image',
    imageController.getImage
);

module.exports = router;