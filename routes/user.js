const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

// router.get('/', function(req, res) {

//   res.json({ message: `YOOO` });

//   // do something here.
// });


module.exports = router;
