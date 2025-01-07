import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: String,
  output: String
});

const exerciseSchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true,
    ref: 'Category'
  },
  exercise_type_id: {
    type: String,
    required: true,
    ref: 'ExerciseType'
  },
  exercise_id: {
    type: String,
    required: true,
    unique: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        return user && user.role === 'teacher';
      },
      message: 'Teacher_id must reference a user with role teacher'
    }
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sample_code: {
    type: String,
    required: true
  },
  testcases: [testCaseSchema]
});

export default mongoose.model('Exercise', exerciseSchema);