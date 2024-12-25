import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET tất cả users
router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET user theo ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST tạo người dùng mới
router.post('/', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword,
            role
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT cập nhật user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password; // Cần hash password
        if (req.body.role) user.role = req.body.role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE xóa user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

        await user.remove();
        res.json({ message: 'Đã xóa user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router; 