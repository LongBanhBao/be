import express from 'express';
import Algorithm from '../models/Algorithm.js';

const router = express.Router();

// GET tất cả algorithms
router.get('/', async (req, res) => {
    try {
        const algorithms = await Algorithm.find();
        res.json(algorithms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET algorithm theo ID
router.get('/:id', async (req, res) => {
    try {
        const algorithm = await Algorithm.findById(req.params.id);
        if (!algorithm) return res.status(404).json({ message: 'Không tìm thấy thuật toán' });
        res.json(algorithm);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo algorithm mới
router.post('/', async (req, res) => {
    const algorithm = new Algorithm({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const newAlgorithm = await algorithm.save();
        res.status(201).json(newAlgorithm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT cập nhật algorithm
router.put('/:id', async (req, res) => {
    try {
        const algorithm = await Algorithm.findById(req.params.id);
        if (!algorithm) return res.status(404).json({ message: 'Không tìm thấy thuật toán' });

        if (req.body.name) algorithm.name = req.body.name;
        if (req.body.description) algorithm.description = req.body.description;

        const updatedAlgorithm = await algorithm.save();
        res.json(updatedAlgorithm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE xóa algorithm
router.delete('/:id', async (req, res) => {
    try {
        const algorithm = await Algorithm.findById(req.params.id);
        if (!algorithm) return res.status(404).json({ message: 'Không tìm thấy thuật toán' });

        await algorithm.deleteOne();
        res.json({ message: 'Đã xóa thuật toán' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 