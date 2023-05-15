
import express from 'express'
import { PrismaClient } from '@prisma/client';
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes';
import GymRoutes from './routes/GymRoutes';
import SlotRoutes from './routes/SlotRoutes';
const app = express();

//1095198642587-0gihl46taipp50l6jgseqfsen1h7q071.apps.googleusercontent.com
const PORT = 4000;
export const prisma = new PrismaClient();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/user',UserRoutes);
app.use('/gym',GymRoutes);
app.use('/slots',SlotRoutes);

app.listen(PORT, ()=> {
    console.log(`Yoga server is running on port ${PORT}`);
})
export default prisma;