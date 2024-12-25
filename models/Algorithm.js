import mongoose from 'mongoose';

const algorithmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Algorithm', algorithmSchema); 