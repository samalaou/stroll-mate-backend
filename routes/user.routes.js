const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get('/:userId', isAuthenticated, async (req, res, next) => {
    const { userId } = req.params;
    try {
        const result = await User.findById(userId);
        const { _id, email, name, isAvailable } = result;
        res.status(200).json({ _id, email, name, isAvailable }); 
    } catch (error) {
        next(error)
    }
});

module.exports = router;