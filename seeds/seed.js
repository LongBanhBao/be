import mongoose from 'mongoose';
import Category from '../models/Category.js';
import ExerciseType from '../models/ExerciseType.js';

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/sorting_algorithm_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Dữ liệu khởi tạo cho Category
const categories = [
  {
    category_id: 'CAT001',
    category_name: 'Tìm kiếm'
  },
  {
    category_id: 'CAT002',
    category_name: 'Sắp xếp'
  }
];

// Dữ liệu khởi tạo cho ExerciseType
const exerciseTypes = [
  {
    exercise_type_id: 'TYPE001',
    category_id: 'CAT001',
    type_name: 'Tìm kiếm tuần tự'
  },
  {
    exercise_type_id: 'TYPE002',
    category_id: 'CAT001',
    type_name: 'Tìm kiếm nhị phân'
  },
  {
    exercise_type_id: 'TYPE003',
    category_id: 'CAT002',
    type_name: 'Sắp xếp nổi bọt'
  },
  {
    exercise_type_id: 'TYPE004',
    category_id: 'CAT002',
    type_name: 'Sắp xếp chèn'
  },
  {
    exercise_type_id: 'TYPE005',
    category_id: 'CAT002',
    type_name: 'Sắp xếp chọn'
  }
];

// Hàm seed data
const seedData = async () => {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany({});
    await ExerciseType.deleteMany({});

    // Thêm categories
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    // Thêm exercise types
    await ExerciseType.insertMany(exerciseTypes);
    console.log('Exercise types seeded successfully');

    console.log('All data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Chạy seed
seedData(); 