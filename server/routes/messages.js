const express = require('express');
const messages = require('../controllers/messages');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

//setup routes

/*
TODO: 
    GET     /
    POST    /
*/

router.get('/', catchAsync(messages.getMessages));
router.post('/', catchAsync(messages.createMessage));

module.exports = router;