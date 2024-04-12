const express = require('express');
const sessions = require('../controllers/sessions');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

//setup routes

/*
TODO: 
    GET     /
    GET     /:id
    POST    /
*/

router.get('/', catchAsync(sessions.getAll));

router.post('/', catchAsync(sessions.createSession));

router.put('/:id', catchAsync(sessions.updateSession));

module.exports = router;