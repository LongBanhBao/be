import express from 'express';
import Submission from '../models/Submission.js';

const router = express.Router();

// GET tất cả submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find()
            .populate('studentId', 'email')
            .populate('assignmentId');
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET submissions theo assignment ID
router.get('/assignment/:assignmentId', async (req, res) => {
    try {
        const submissions = await Submission.find({ assignmentId: req.params.assignmentId })
            .populate('studentId', 'email');
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo submission mới
router.post('/', async (req, res) => {
    const submission = new Submission({
        studentId: req.body.studentId,
        assignmentId: req.body.assignmentId,
        code: req.body.code,
        result: req.body.result
    });

    try {
        const newSubmission = await submission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router; 