import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import loggerMiddleware from './middleware/loggerMiddleware.js';
import errorHandler from './middleware/errorHandler.js';
import { globalLimiter } from './middleware/rateLimiters.js';
import tasksRouter from './routes/tasksRouter.js';
import usersRouter from './routes/usersRouter.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(loggerMiddleware);
app.use(globalLimiter);

//HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

//ROUTES 
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

//GLOBAL ERROR HANDLER
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Task Manager API running on http://localhost:3000');
});