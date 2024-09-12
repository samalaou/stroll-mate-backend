const express = require('express');
const router = express.Router();
const Message = require('../models/Message.model');
const User = require('../models/User.model');

router.post('/', async (req, res, next) => {
    try {
        const savedMessage = await Message.create(req.body);

        // format the same why at the get to update the chat
        const formattedMessage = {
            ...savedMessage.toObject(),
            from: { _id: savedMessage.from },
            to: { _id: savedMessage.to }
        };

        res.status(201).json(formattedMessage);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    const authenticatedUserId = req.payload._id;
    const otherUserId = req.query.userId;

    try {
        const messages = await Message.find({
            $or: [
                { from: authenticatedUserId, to: otherUserId },
                { from: otherUserId, to: authenticatedUserId }
            ]
        })
        .populate({
            path: 'from',
            select: '_id'
        })
        .populate({
            path: 'to',
            select: '_id'
        })
        .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        next(error);
    }
});
  
// get all user names should be update later to return only the users for who a message already exist
// should return the availability too
router.get('/chats', async (req, res, next) => {
    try {
        const users = await User.find().select('_id name isAvailable');
        const formattedUsers = users.map(user => ({
            _id: user._id,
            username: user.name,
            isAvailable: user.isAvailable
        }));
        res.json(formattedUsers);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
