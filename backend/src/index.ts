import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contentRoutes from './routes/contentRoutes';
import { connectDB } from './config/database';
import errorHandler from './middlewares/errorHandler';
import Content from './models/contentModels';

dotenv.config();
const app = express();
const cron = require('node-cron');

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.path);
    next();
});
app.use(cors({ origin: ['http://localhost:3000', 'http://frontend-content-workflow-bucket.s3-website.eu-west-2.amazonaws.com'] }));
app.use(express.json());

connectDB();

app.use('/api', contentRoutes);
app.use(errorHandler);

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task...');

    const now = new Date().getTime();

    try {
        const contentItems = await Content.find({ status: 'draft' });

        contentItems.forEach(async (item) => {
            if (item.createdAt && now - new Date(item.createdAt).getTime() > SEVEN_DAYS_IN_MS) {
                item.status = 'review';
                await item.save();
                console.log(`Content ID ${item._id} status updated to review`);
            }
        });
    } catch (error) {
        console.error('Error in scheduled task:', error);
    }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
