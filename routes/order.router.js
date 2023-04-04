const router = require('express').Router();

const {orderController} = require('../controllers');
const {orderMiddleware, customerMiddleware} = require('../middlewares');
const {createOrderValidator} = require('../validators/order.validator');
const {createCustomerValidator} = require('../validators/customer.validator');

router.get(
    '/',
    orderController.getOrders
);
router.post(
    '/',
    orderMiddleware.divideOrderAndCustomer,
    customerMiddleware.isCustomerBodyValidForOrder(createCustomerValidator),
    orderMiddleware.isOrderBodyValid(createOrderValidator),
    customerMiddleware.checkCustomerByEmailForOrder,
    orderController.createOrder
);

module.exports = router;