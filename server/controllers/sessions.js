const Session = require('../models/session');
const User = require('../models/user');
const Message = require('../models/message');

module.exports.getAll = async (req, res) => {
    const sessions = await Session.find().sort({ date: -1 });

    res.json(sessions);

}

//coach should be either passed as ObjectId and looked up before calling the endpoints, or be looked up inside endpoints
//if looked up before, then need to create /:id endpoint for coach

//need session and coach in 
module.exports.createSession = async (req, res) => {
    //find coach
    // const { coach } = req.body;
    // const foundCoach = await User.findOne({ firstName: new RegExp(coach, 'i'), role: "coach" });

    // if (foundCoach) {
    //     const session = new Session({coach: foundCoach, attendees: []});
    //     await session.save();
    //     res.json(session);
    // } else {
    //     res.status(400).send("Coach not found")
    // }

    const session = new Session({...req.body, attendees: []});
    await session.save();
    res.json(session);

}

//same here
module.exports.updateSessionCoach = async (req, res) => {
    const { coachName } = req.body;
    const foundCoach = await User.findOne({ firstName: new RegExp(`^${coachName}$`, 'i'), role: "coach" });

    if (foundCoach) {
        const { id } = req.params;

        const session = await Session.findByIdAndUpdate(id, { coach: foundCoach._id }, { new: true });

        res.json(session);
    } else {
        res.status(400).send("Coach not found");
    }

}

//edit attendees list

//need id of member
module.exports.addSessionAttendee = async (req, res) => {
    const { id } = req.params;
    const { attendeeId } = req.body;
    const session = await Session.findByIdAndUpdate(id, { $push: { attendees: attendeeId } }, { new: true });
    res.json(session);
    //TODO: send message
}

//need id of member
module.exports.removeSessionAttendee = async (req, res) => {
    const { id } = req.params;
    const { attendeeId } = req.body;
    const session = await Session.findByIdAndUpdate(id, { $pull: { attendees: attendeeId } }, { new: true });
    res.json(session);
    //TODO: send message
}

//member session signup
//not working yet
module.exports.memberSignup = async (req, res) => {
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, { $push: { attendees: req.user._id } }, { new: true });
    res.json(session);
}