import express from 'express';
import Assignment from '../models/Assignment.js';

const router = express.Router();

// GET tất cả assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('classId')
            .populate('teacherId', 'email');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET assignment theo ID
router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id)
            .populate('classId')
            .populate('teacherId', 'email');
        if (!assignment) return res.status(404).json({ message: 'Không tìm thấy bài tập' });
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo assignment mới
router.post('/', async (req, res) => {
    const assignment = new Assignment({
        classId: req.body.classId,
        teacherId: req.body.teacherId,
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        points: req.body.points,
        testCases: req.body.testCases || []
    });

    try {
        const newAssignment = await assignment.save();
        res.status(201).json(newAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT cập nhật assignment
router.put('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Không tìm thấy bài tập' });

        Object.assign(assignment, req.body);
        const updatedAssignment = await assignment.save();
        res.json(updatedAssignment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE xóa assignment
router.delete('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Không tìm thấy bài tập' });

        await assignment.deleteOne();
        res.json({ message: 'Đã xóa bài tập' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 