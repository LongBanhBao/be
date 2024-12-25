import express from 'express';
import Class from '../models/Class.js';

const router = express.Router();

// GET tất cả classes
router.get('/', async (req, res) => {
    try {
        const classes = await Class.find()
            .populate('teacherId', 'email')
            .populate('students', 'email');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET class theo ID
router.get('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id)
            .populate('teacherId', 'email')
            .populate('students', 'email');
        if (!classItem) return res.status(404).json({ message: 'Không tìm thấy lớp học' });
        res.json(classItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo class mới
router.post('/', async (req, res) => {
    const classItem = new Class({
        teacherId: req.body.teacherId,
        classCode: req.body.classCode,
        className: req.body.className,
        students: req.body.students || []
    });

    try {
        const newClass = await classItem.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT cập nhật class
router.put('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) return res.status(404).json({ message: 'Không tìm thấy lớp học' });

        if (req.body.className) classItem.className = req.body.className;
        if (req.body.students) classItem.students = req.body.students;

        const updatedClass = await classItem.save();
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE xóa class
router.delete('/:id', async (req, res) => {
    try {
        const classItem = await Class.findById(req.params.id);
        if (!classItem) return res.status(404).json({ message: 'Không tìm thấy lớp học' });

        await classItem.deleteOne();
        res.json({ message: 'Đã xóa lớp học' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 