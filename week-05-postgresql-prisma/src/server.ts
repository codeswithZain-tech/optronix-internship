import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import loansRouter from './routes/loans';
import membersRouter from './routes/members';
import booksRouter from './routes/books';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/loans', loansRouter);
app.use('/api/members', membersRouter);
app.use('/api/books', booksRouter);

app.get('/health', (_, res) => res.json({ status: 'ok', uptime: process.uptime() }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));