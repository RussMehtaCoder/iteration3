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

router.put('/:id/coach', catchAsync(sessions.updateSessionCoach));

router.put('/:id/attendees/add', catchAsync(sessions.addSessionAttendee));

router.put('/:id/attendees/remove', catchAsync(sessions.removeSessionAttendee));

router.post('/:id/signup', catchAsync(sessions.memberSignup));

module.exports = router;