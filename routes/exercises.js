import express from 'express';
import Exercise from '../models/Exercise.js';

const router = express.Router();

// GET tất cả exercises
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find()
            .populate('teacherId', 'email');
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET exercise theo ID
router.get('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id)
            .populate('teacherId', 'email');
        if (!exercise) return res.status(404).json({ message: 'Không tìm thấy bài tập' });
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo exercise mới
router.post('/', async (req, res) => {
    const exercise = new Exercise({
        teacherId: req.body.teacherId,
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        exerciseType: req.body.exerciseType
    });

    try {
        const newExercise = await exercise.save();
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT cập nhật exercise
router.put('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Không tìm thấy bài tập' });

        Object.assign(exercise, req.body);
        const updatedExercise = await exercise.save();
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE xóa exercise
router.delete('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: 'Không tìm thấy bài tập' });

        await exercise.deleteOne();
        res.json({ message: 'Đã xóa bài tập' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 