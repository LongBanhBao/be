import mongoose from 'mongoose';

const exerciseTypeSchema = new mongoose.Schema({
  exercise_type_id: {
    type: String,
    required: true,
    unique: true
  },
  category_id: {
    type: String,
    required: true,
    ref: 'Category'
  },
  type_name: {
    type: String,
    required: true,
    enum: [
      'Tìm kiếm tuần tự',
      'Tìm kiếm nhị phân',
      'Sắp xếp nổi bọt',
      'Sắp xếp chèn',
      'Sắp xếp chọn'
    ]
  }
});

// Thêm validation để đảm bảo type_name phù hợp với category_id
exerciseTypeSchema.pre('save', async function(next) {
  const Category = mongoose.model('Category');
  const category = await Category.findOne({ category_id: this.category_id });
  
  if (!category) {
    return next(new Error('Category không tồn tại'));
  }

  const searchTypes = ['Tìm kiếm tuần tự', 'Tìm kiếm nhị phân'];
  const sortTypes = ['Sắp xếp nổi bọt', 'Sắp xếp chèn', 'Sắp xếp chọn'];

  if (category.category_name === 'Tìm kiếm' && !searchTypes.includes(this.type_name)) {
    return next(new Error('Loại bài tập không phù hợp với thể loại Tìm kiếm'));
  }

  if (category.category_name === 'Sắp xếp' && !sortTypes.includes(this.type_name)) {
    return next(new Error('Loại bài tập không phù hợp với thể loại Sắp xếp'));
  }

  next();
});

export default mongoose.model('ExerciseType', exerciseTypeSchema); 