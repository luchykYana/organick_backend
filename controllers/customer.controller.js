const {Customer} = require('../dataBase');

module.exports = {
    getCustomers: async (req, res, next) => {
        try {
            const orders = await Customer.find();

            res.json(orders);
        } catch (e) {
            next(e);
        }
    },

    createCustomer: async (req, res, next) => {
        try {
            const customer = req.body;

            const newCustomer = await Customer.create(customer);

            res.json(newCustomer);
        } catch (e) {
            next(e);
        }
    },

    getCustomerById: (req, res, next) => {
        try {
            const {customer} = req;

            res.json(customer);
        } catch (e) {
            next(e);
        }
    },

    updateCustomer: async (req, res, next) => {
        try {
            const {customer_id} = req.params;
            const customer_body = req.body;

            const customer = await Customer.findByIdAndUpdate(customer_id, customer_body, {new: true});

            res.json(customer);
        } catch (e) {
            next(e);
        }
    },

    deleteCustomer: async (req, res, next) => {
        try {
            const {id} = req.customer;

            await Customer.findByIdAndDelete({_id: id});

            res.json('Customer is deleted!');
        } catch (e) {
            next(e);
        }
    },

    subscribe: async (req, res, next) => {
        try {
            const id = req.customer_id;
            const customer_body = {
                subscription: req.body.subscription
            };

            await Customer.findByIdAndUpdate(id, customer_body, {new: true});

            res.json('Subscribe!');
        } catch (e) {
            next(e);
        }
    },
}