import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import initializeDB from './config/initDB.js';

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sorting_algorithm_db';

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
import userRoutes from './routes/users.js';
import submissionRoutes from './routes/submissions.js';
import exerciseRoutes from './routes/exercises.js';
import authRoutes from './routes/auth.js';

// Sử dụng routes
app.use('/api/users', userRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/auth', authRoutes);

// Routes cơ bản
app.get('/', (req, res) => {
    res.send('API đang chạy');
});

// Kết nối đến MongoDB và khởi động server
const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB đã kết nối thành công');
        
        // Khởi tạo dữ liệu mẫu (bỏ comment nếu muốn tạo dữ liệu mẫu)
        //await initializeDB();
        
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Lỗi khởi động server:', error);
        process.exit(1);
    }
};

// Xử lý tắt server một cách an toàn
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB kết nối đã đóng');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi đóng kết nối MongoDB:', error);
        process.exit(1);
    }
});

// Xử lý lỗi không được xử lý
process.on('unhandledRejection', (error) => {
    console.error('Lỗi không được xử lý:', error);
    // Log lỗi nhưng không tắt server ngay lập tức
    console.error('Stack trace:', error.stack);
});

// Xử lý lỗi uncaught exception
process.on('uncaughtException', (error) => {
    console.error('Lỗi không được bắt:', error);
    // Log lỗi và tắt server an toàn
    console.error('Stack trace:', error.stack);
    process.exit(1);
});

startServer();
