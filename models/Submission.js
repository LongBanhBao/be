import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        return user && user.role === 'student';
      },
      message: 'Student_id must reference a user with role student'
    }
  },
  exercise_id: {
    type: String,
    required: true,
    ref: 'Exercise'
  },
  code: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Submission', submissionSchema);