import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        required: true
    },
    confirmKey: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema); 