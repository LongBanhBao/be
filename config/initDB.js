import mongoose from 'mongoose';
import User from '../models/User.js';
import Exercise from '../models/Exercise.js';
import ExerciseType from '../models/ExerciseType.js';
import Category from '../models/Category.js';
import bcrypt from 'bcrypt';

const initializeDB = async () => {
    try {
        // Kết nối đến MongoDB
        await mongoose.connect('mongodb://localhost:27017/sorting_algorithm_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Xóa dữ liệu cũ (nếu có)
        await Promise.all([
            User.deleteMany({}),
            Exercise.deleteMany({}),
            ExerciseType.deleteMany({}),
            Category.deleteMany({})
        ]);

        // Tạo user mẫu
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            email: 'admin@lecturer.com',
            password: hashedPassword,
            role: 'admin',
            confirmKey: 'admin-key'
        });

        // Tạo categories mẫu
        const categories = await Category.insertMany([
            { category_id: 'CAT001', category_name: 'Tìm kiếm' },
            { category_id: 'CAT002', category_name: 'Sắp xếp' }
        ]);

        // Tạo exercise types mẫu
        const exerciseTypes = await ExerciseType.insertMany([
            { exercise_type_id: 'TYPE001', category_id: 'CAT001', type_name: 'Tìm kiếm tuần tự' },
            { exercise_type_id: 'TYPE002', category_id: 'CAT001', type_name: 'Tìm kiếm nhị phân' },
            { exercise_type_id: 'TYPE003', category_id: 'CAT002', type_name: 'Sắp xếp nổi bọt' },
            { exercise_type_id: 'TYPE004', category_id: 'CAT002', type_name: 'Sắp xếp chèn' },
            { exercise_type_id: 'TYPE005', category_id: 'CAT002', type_name: 'Sắp xếp chọn' }
        ]);


        console.log('Đã khởi tạo dữ liệu mẫu thành công!');
        
    } catch (error) {
        console.error('Lỗi khởi tạo dữ liệu:', error);
    } finally {
        // mongoose.connection.close();
    }
};

export default initializeDB; 