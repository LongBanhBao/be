import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true,
    unique: true
  },
  category_name: {
    type: String,
    required: true,
    enum: ['Tìm kiếm', 'Sắp xếp']
  }
});

export default mongoose.model('Category', categorySchema);  