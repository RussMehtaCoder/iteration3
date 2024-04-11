const express = require('express');
const payments = require('../controllers/payments');

const router = express.Router();

//setup routes



/*
TODO:
    GET     /
    POST    /
*/

// router.get('/', (req, res) => res.send('hit payments get!'))
router.get('/', payments.getTreasurerPayments);

router.post('/', payments.makePayment);

module.exports = router;