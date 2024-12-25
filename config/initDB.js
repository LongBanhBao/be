import mongoose from 'mongoose';
import User from '../models/User.js';
import Class from '../models/Class.js';
import Assignment from '../models/Assignment.js';
import Exercise from '../models/Exercise.js';
import Algorithm from '../models/Algorithm.js';

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
            Class.deleteMany({}),
            Assignment.deleteMany({}),
            Exercise.deleteMany({}),
            Algorithm.deleteMany({})
        ]);

        // Tạo user mẫu
        const admin = await User.create({
            email: 'admin@example.com',
            password: '$2b$10$XYZ...', // Hãy mã hóa password trước khi lưu
            role: 'admin',
            confirmKey: 'admin-key'
        });

        const teacher = await User.create({
            email: 'teacher@example.com',
            password: '$2b$10$XYZ...',
            role: 'teacher'
        });

        const student = await User.create({
            email: 'student@example.com',
            password: '$2b$10$XYZ...',
            role: 'student'
        });

        // Tạo lớp học mẫu
        const class1 = await Class.create({
            teacherId: teacher._id,
            classCode: 'CLASS001',
            className: 'Lớp Thuật Toán Cơ Bản',
            students: [student._id]
        });

        // Tạo bài tập mẫu
        const assignment = await Assignment.create({
            classId: class1._id,
            teacherId: teacher._id,
            title: 'Bài tập Bubble Sort',
            description: 'Implement thuật toán Bubble Sort',
            level: 'basic',
            points: 10,
            testCases: [
                {
                    input: '[5,4,3,2,1]',
                    output: '[1,2,3,4,5]',
                    isValid: true
                }
            ],
            statistics: {
                totalStudents: 1,
                correctCount: 0
            }
        });

        // Tạo thuật toán mẫu
        const algorithms = await Algorithm.create([
            {
                name: 'Bubble Sort',
                description: 'Thuật toán sắp xếp nổi bọt'
            },
            {
                name: 'Quick Sort',
                description: 'Thuật toán sắp xếp nhanh'
            },
            {
                name: 'Merge Sort',
                description: 'Thuật toán sắp xếp trộn'
            }
        ]);

        // Tạo bài tập trong kho
        const exercise = await Exercise.create({
            teacherId: teacher._id,
            title: 'Bài tập Quick Sort',
            description: 'Implement thuật toán Quick Sort',
            level: 'intermediate',
            exerciseType: {
                name: 'Sorting',
                description: 'Các bài tập về sắp xếp'
            }
        });

        console.log('Đã khởi tạo dữ liệu mẫu thành công!');
        
    } catch (error) {
        console.error('Lỗi khởi tạo dữ liệu:', error);
    } finally {
        // mongoose.connection.close();
    }
};

export default initializeDB; 