const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {imageRouter, categoryRouter, productRouter, orderRouter, customerRouter} = require('./routes');
const {ErrorHandler, errors} = require('./errors');
const {config} = require('./configs');

const {MONGO_CONNECT_URL, PORT, NODE_ENV, ALLOWED_ORIGIN} = config;
const {CORS_IS_FORBIDDEN} = errors;

const app = express();

console.log(MONGO_CONNECT_URL)

mongoose.connect(MONGO_CONNECT_URL).then(() => {
    console.log('Mongo is connected');
});

app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/images', imageRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/customers', customerRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    // const whiteList = ALLOWED_ORIGIN.split(';');
    //
    // if (!whiteList.includes(origin)) {
    //     return callback(new ErrorHandler(CORS_IS_FORBIDDEN.message, CORS_IS_FORBIDDEN.code), false);
    // }

    return callback(null, true);
}