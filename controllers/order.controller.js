const {Order} = require('../dataBase');

module.exports = {
    getOrders: async (req, res, next) => {
        try {
            const orders = await Order.find();

            res.json(orders);
        } catch (e) {
            next(e);
        }
    },

    createOrder: async (req, res, next) => {
        try {
            const order = req.order;

            order.customer_id = req.customer_id;

            const newOrder = await Order.create(order);

            res.json(newOrder);
        } catch (e) {
            next(e);
        }
    }
}