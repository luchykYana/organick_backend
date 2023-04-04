const {BAD_REQUEST_CUSTOMER_REGISTERED} = require('../errors/custom-errors');
const {errors, ErrorHandler} = require('../errors');
const {Customer} = require('../dataBase');

const {NOT_VALID_BODY, NOT_FOUND_BY_ID} = errors;

module.exports = {
    isCustomerBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCustomerByEmail: async (req, res, next) => {
        try {
            const {email} = req.body;

            const customerByEmail = await Customer.findOne({email});

            if (customerByEmail) {
                throw new ErrorHandler(BAD_REQUEST_CUSTOMER_REGISTERED.message, BAD_REQUEST_CUSTOMER_REGISTERED.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCustomerById: async (req, res, next) => {
        try {
            const {customer_id} = req.params;

            const customer = await Customer.findById(customer_id);

            if (!customer) {
                throw new ErrorHandler(NOT_FOUND_BY_ID.message, NOT_FOUND_BY_ID.code);
            }

            req.customer = customer;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCustomerBodyValidForOrder: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.customer);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.customer = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCustomerByEmailForOrder: async (req, res, next) => {
        try {
            const {email} = req.customer;

            const customerByEmail = await Customer.findOne({email});

            if (customerByEmail) {
                req.customer_id = customerByEmail.id;
            } else {
                const newCustomer = await Customer.create(req.customer);
                req.customer_id = newCustomer.id;
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};