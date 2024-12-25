import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema); 