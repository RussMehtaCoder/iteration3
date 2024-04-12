const Message = require('../models/message');

// when a user logs in, a fetch is made to all messages where logged in user is ‘receiver’


//need firebase
module.exports.getMessages = async (req, res) => {
    const messages = await Message.find({receiver: req.user._id})
    res.json(messages);
}

module.exports.createMessage = async (req, res) => {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
}
