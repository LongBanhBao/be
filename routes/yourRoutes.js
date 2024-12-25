const express = require('express');
const router = express.Router();
const YourModel = require('../models/YourModel');

// GET tất cả items
router.get('/', async (req, res) => {
    try {
        const items = await YourModel.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
