import mongoose from 'mongoose';

const exerciseTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

const exerciseSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['basic', 'intermediate', 'advanced'],
        required: true
    },
    exerciseType: exerciseTypeSchema
}, { timestamps: true });

export default mongoose.model('Exercise', exerciseSchema);