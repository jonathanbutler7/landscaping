const router = require('express').Router();
const workers = require('./routes/workers-router');
const orders = require('./routes/orders-router');
const customers = require('./routes/customers-router');

router.use('/workers', workers);
router.use('/orders', orders);
router.use('/customers', customers);

module.exports = router;