const express = require('express');
const { authenticate, } = require('../middlewares/auth');
const backendFunc = require('../controllers/auth');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Payment = require('../models/payment');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


router.post('/makepayment', backendFunc.makePayment, (req, res) => {
  // console.log(res.payment);
  res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});


router.get('/getuserinfo', backendFunc.getUserInfo, (req, res) => {
  // console.log(req.user);
  // console.log(req.user.paymentArr);
  // Constructing the response object
  const response = {
    user: req.user,
    payments: req.user.paymentArr
  };

  // Sending the response as JSON
  res.json(response);

  // res.json(req.user)
  // res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});


router.get('/getmemberlist', backendFunc.getMemberList, (req, res) => {
  // console.log(req.user);
  // console.log(req.user.paymentArr);
  // Constructing the response object
  // const response = {
  //   user: req.user,
  //   payments: req.user.paymentArr
  // };

  // Sending the response as JSON
  res.json(res.finalReturn);

  // res.json(req.user)
  // res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});


router.post('/sendmessage', backendFunc.sendMessage, (req, res) => {
  // console.log(req.user);
  // console.log(req.user.paymentArr);
  // Constructing the response object
  // const response = {
  //   user: req.user,
  //   payments: req.user.paymentArr
  // };

  // Sending the response as JSON
  res.json(req.messageData);

  // res.json(req.user)
  // res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});



router.get('/getstatement', backendFunc.getStatement, (req, res) => {
  // console.log(req.user);
  // console.log(req.user.paymentArr);
  // Constructing the response object
  // const response = {
  //   user: req.user,
  //   payments: req.user.paymentArr
  // };

  // Sending the response as JSON
  res.json(req.finalData);

  // res.json(req.user)
  // res.json({ message: `${req.payment.firstName} ${req.payment.lastName} paid for ${req.payment.paymentTitle}` });
});






// router.post('/makePayment', authenticate, (req, res) => {
//   // res.json({ message: `Welcome ${req.user.username}` });
// });




// router.get('/', function(req, res) {

//   res.json({ message: `YOOO` });

//   // do something here.
// });


module.exports = router;
