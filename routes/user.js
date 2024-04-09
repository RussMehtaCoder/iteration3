const express = require('express');
const { authenticate, } = require('../middlewares/auth');
const backendFunc = require('../controllers/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const Payment = require('../models/Payments');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


router.post('/makepayment', backendFunc.makePayment, (req, res) => {
  // console.log(res.payment);
  res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});



// router.post('/makePayment', authenticate, (req, res) => {
//   // res.json({ message: `Welcome ${req.user.username}` });
// });




// router.get('/', function(req, res) {

//   res.json({ message: `YOOO` });

//   // do something here.
// });


module.exports = router;
