
import express from 'express'
import { PrismaClient } from '@prisma/client';
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes';
const app = express();

const PORT = 3300;
export const prisma = new PrismaClient();

app.use(compression());
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/user',UserRoutes);

app.listen(PORT, ()=> {
    console.log(`Yoga server is running on port ${PORT}`);
})
export default prisma;