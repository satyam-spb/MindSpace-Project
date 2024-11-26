import express from 'express';
import path from 'path';
import 'dotenv/config';
import url from 'url';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Response compression

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
