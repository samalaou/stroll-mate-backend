const express = require('express');
const router = express.Router();
const Walk = require('../models/Walk.model');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.post('/', isAuthenticated, async (req, res, next) => {
    const authenticatedUserId = req.payload._id;
    try {
        const walkData = { ...req.body, user: authenticatedUserId };
        const savedWalk = await Walk.create(walkData);
        res.status(201).json(savedWalk);
    } catch (error) {
        next(error);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const walks = await Walk.find().populate({
            path: 'user',
            select: 'name'
        });
        res.json(walks);
    } catch (error) {
        next(error)
    }
});

router.get('/:walkId', async (req, res, next) => {
    const { walkId } = req.params;
    try {
        const walk = await Walk.findById(walkId).populate({
            path: 'user',
            select: 'name'
        });
        res.json(walk);
    } catch (error) {
        next(error)
    }
});

router.put('/:walkId', isAuthenticated, async (req, res, next) => {
    const { walkId } = req.params;
    const authenticatedUserId = req.payload._id;

    try {
        const walk = await Walk.findById(walkId).populate('user', 'name');
        if (walk.user._id.toString() !== authenticatedUserId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this walk' });
        }

        const updatedWalk = await Walk.findByIdAndUpdate(walkId, req.body, { new: true }).populate({
            path: 'user',
            select: 'name'
        });
        
        res.json(updatedWalk);
    } catch (error) {
        next(error);
    }
});


router.delete('/:walkId', isAuthenticated, async (req, res, next) => {
    const { walkId } = req.params;
    const authenticatedUserId = req.payload._id;

    try {
        const walk = await Walk.findById(walkId).populate('user', 'name');
        if (walk.user._id.toString() !== authenticatedUserId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this walk' });
        }

        await Walk.findByIdAndDelete(walkId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});


module.exports = router;
