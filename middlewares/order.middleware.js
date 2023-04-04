const {errors, ErrorHandler} = require('../errors');

const {NOT_VALID_BODY} = errors;

module.exports = {
    divideOrderAndCustomer: (req, res, next) => {
        try {
            const data = req.body;
            const {customer_info, order_info} = data;

            req.order = {
                total_price: order_info.price,
                discount: order_info.discount,
                goods: order_info.cart,
                customer_info: {
                    full_name: customer_info.full_name,
                    address: customer_info.address,
                    phone_number: customer_info.phone_number,
                    message: customer_info.message
                }
            };

            req.customer = {
                email: customer_info.email
            };

            next();
        } catch (e) {
            next(e);
        }
    },

    isOrderBodyValid: (orderValidator) => (req, res, next) => {
        try {
            const {error, value} = orderValidator.validate(req.order);

            if (error) {
                throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
            }

            req.order = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}
