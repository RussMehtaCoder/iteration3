const Session = require('../models/session');
const User = require('../models/user');
const Message = require('../models/message');
const Payment = require('../models/payment');

module.exports.getAll = async (req, res) => {
    let sessions = await Session.find().populate('attendees').sort({ date: -1 });

    const role = req.query.role;

    if (role) {
        sessions = sessions.filter(session => session.coach.toString() === req.user._id.toString());
    }

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
    // const { coachName } = req.body;
    // const foundCoach = await User.findOne({ firstName: new RegExp(`^${coachName}$`, 'i'), role: "coach" });

    // if (foundCoach) {
    //     const { id } = req.params;

    //     const session = await Session.findByIdAndUpdate(id, { coach: foundCoach._id }, { new: true });

    //     res.json(session);
    // } else {
    //     res.status(400).send("Coach not found");
    // }

    const { id } = req.params;
    const { coachId } = req.body;

    const session = await Session.findByIdAndUpdate(id, { coach: coachId }, { new: true });

    res.json(session);

}

//edit attendees list

//need an id of member to be added to be sent in req.body (called from coach)
module.exports.addSessionAttendee = async (req, res) => {
    const { id } = req.params;
    const { attendeeId } = req.body;
    const session = await Session.findByIdAndUpdate(id, { $push: { attendees: attendeeId } }, { new: true });
    
    const message = new Message({text: "You were added to a session", receiver: attendeeId });
    await message.save();

    //post payment
    const payment = new Payment({
        payer: attendeeId,
        paysFor: 'session',
        amount: 10,
        status: 'unpaid',
    })
    await payment.save();
    
    res.json(session);
}

//need an id of member to be added to be sent in req.body
module.exports.removeSessionAttendee = async (req, res) => {
    const { id } = req.params;
    const { attendeeId } = req.body;
    const session = await Session.findByIdAndUpdate(id, { $pull: { attendees: attendeeId } }, { new: true });
    
    const message = new Message({text: "You were removed from a session", receiver: attendeeId });
    await message.save();

    /* 
    should remove payment for the session but payments not linked directly to sessions 
    const payment = await Payment.findOneAndDelete({})
    */
    
    res.json(session);
}

//signup member for a session (called by member)
module.exports.memberSignup = async (req, res) => {
    //put to sessions' attendee list
    const { id } = req.params;
    const session = await Session.findByIdAndUpdate(id, { $push: { attendees: req.user._id } }, { new: true });

    //sent notification
    const date = new Date(session.date);
    const readableDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const message = new Message({text: `You signed up for a session on ${readableDate}`, receiver: req.user._id });
    await message.save();

    //post payment
    const payment = new Payment({
        payer: req.user._id,
        paysFor: 'session',
        amount: 10,
        status: 'unpaid',
    })
    await payment.save();

    res.json(session);
}