const express = require('express');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

//setup routes

/*
TODO: 
    GET     /members
    GET     /coaches
*/

router.get('/members', catchAsync(users.getMembers));
router.get('/coaches', catchAsync(users.getCoaches));

module.exports = router;