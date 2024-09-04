const express = require('express');
const router = express.Router();
const Walk = require('../models/Walk.model');


router.post('/', async (req, res, next) => {
    try {
        const savedWalk = await Walk.create(req.body);
        res.status(201).json(savedWalk);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    //todo: get only current user walks
    try {
        const walks = await Walk.find();
        res.json(walks);
    } catch (error) {
        next(error)
    }
});

router.get('/:walkId', async (req, res, next) => {
    const { walkId } = req.params;
    try {
        const walk = await Walk.findById(walkId);
        res.json(walk);
    } catch (error) {
        next(error)
    }
});

router.put('/:walkId', async (req, res, next) => {
    const { walkId } = req.params;
    try {
        const updatedWalk = await Walk.findByIdAndUpdate(walkId, req.body, { new: true });
        res.json(updatedWalk);
    } catch (error) {
        next(error)
    }
});

router.delete('/:walkId', async (req, res, next) => {
    const { walkId } = req.params;
    try {
        await Walk.findByIdAndDelete(walkId);
        res.status(204).send();
    } catch (error) {
        next(error)
    }
});

module.exports = router;
