const router = require('express').Router();
const workers = require('./workers-router');
const orders = require('./orders-router');
const customers = require('./customers-router');

router.use('/workers', workers);
router.use('/orders', orders);
router.use('/customers', customers);

module.exports = router;