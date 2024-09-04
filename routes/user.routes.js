const express = require('express');
const router = express.Router();
const User = require('../models/User.model');


router.get('/', async (req, res, next) => {
    const authenticatedUserId = req.payload._id;

    try {
        const result = await User.findById(authenticatedUserId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { _id, email, name, isAvailable } = result;
        res.status(200).json({ _id, email, name, isAvailable }); 
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    const authenticatedUserId = req.payload._id;

    try {
        const updatedUser = await User.findByIdAndUpdate(authenticatedUserId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
});

module.exports = router;