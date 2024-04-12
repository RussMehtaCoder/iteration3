const express = require("express");
const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const auth = require("../middlewares/auth");

const router = express.Router();

//create user needed before firebase check, as non authorized users can still make accounts
// router.post("/", users.createUser);

//this line checks auth and puts userDocument on request.user

router.get("/firebase", users.getUserFirebaseUID);
//setup routes

/*
TODO: 
    GET     /members
    GET     /coaches
*/

router.get("/members", catchAsync(users.getMembers));
router.get("/coaches", catchAsync(users.getCoaches));

module.exports = router;
