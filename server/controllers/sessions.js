const Session = require('../models/session');
const User = require('../models/user');

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
    const { coach } = req.body;
    const foundCoach = User.findOne({ firstName: new RegExp(coach, 'i'), role: "coach" });

    if (foundCoach) {
        const { id } = req.params;

        const session = await Session.findByIdAndUpdate(id, { coach: foundCoach });

        await session.save();
        res.json(session);
    } else {
        res.status(400).send("Coach not found");
    }

}

//edit attendees list
//member session signup