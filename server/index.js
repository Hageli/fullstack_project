import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { register } from './controllers/authController.js'
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'
import postRoutes from './routes/postRoute.js'
import { verifyToken } from './middleware/authMiddleware.js'
import { createPost } from './controllers/postController.js'

// SERVER CONFIG
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ extended: true }));
app.use/bodyParser.urlencoded({ extended: true });
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// MULTER STORAGE FOR FILES
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// ROUTES THAT REQUIRE FILE UPLOAD
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// OTHER ROUTES
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch((error) => console.log(`Error while starting server:${error}`))