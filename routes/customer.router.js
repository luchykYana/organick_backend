const router = require('express').Router();

const {customerController} = require('../controllers');
const {customerMiddleware} = require('../middlewares');
const {createCustomerValidator, updateCustomerValidator} = require('../validators/customer.validator');

router.get(
    '/',
    customerController.getCustomers
);
router.post(
    '/',
    customerMiddleware.isCustomerBodyValid(createCustomerValidator),
    customerMiddleware.checkCustomerByEmail,
    customerController.createCustomer
);

router.get(
    '/:customer_id',
    customerMiddleware.checkCustomerById,
    customerController.getCustomerById
);
router.put(
    '/:customer_id',
    customerMiddleware.isCustomerBodyValid(updateCustomerValidator),
    customerMiddleware.checkCustomerById,
    customerController.updateCustomer
);
router.delete(
    '/:customer_id',
    customerMiddleware.checkCustomerById,
    customerController.deleteCustomer
);

module.exports = router;