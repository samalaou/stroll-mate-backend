const express = require('express');
const router = express.Router();
const Message = require('../models/Message.model');

router.post('/', async (req, res, next) => {
    try {
      const savedMessage = await Message.create(req.body);
      res.status(201).json(savedMessage);
    } catch (error) {
      next(error)
    }
});

module.exports = router;
