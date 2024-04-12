const express = require('express');
const payments = require('../controllers/payments');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

/*
TODO:
    GET     /
    POST    /
*/

// router.get('/', (req, res) => res.send('hit payments get!'))

router.get('/treasurer', catchAsync(payments.getTreasurerPayments));

router.get('/treasurer/income', catchAsync(payments.getTreasurerIncome));

router.get('/member', catchAsync(payments.getMemberPayments));

router.post('/:id/pay', catchAsync(payments.pay));

router.post('/', catchAsync(payments.createPayment));

module.exports = router;