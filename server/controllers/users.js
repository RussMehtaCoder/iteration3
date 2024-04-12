const User = require('../models/user');

module.exports.getMembers = async (req, res) => {
    //fetch all users with role member
    const members = await User.find({role: "member"}).select("firstName lastName email lateStatus");
    res.json(members);
}

module.exports.getCoaches = async (req, res) => {
    //fetch all users with role coach
    const members = await User.find({role: "coach"}).select("firstName lastName email");
    res.json(members);
}