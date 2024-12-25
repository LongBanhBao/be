import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        default: true
    }
});

const assignmentSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
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
    points: {
        type: Number,
        required: true
    },
    testCases: [testCaseSchema],
    statistics: {
        totalStudents: { type: Number, default: 0 },
        correctCount: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model('Assignment', assignmentSchema);