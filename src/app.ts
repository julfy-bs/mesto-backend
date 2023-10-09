import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

import auth from './middleware/auth';
import handleValidationError from './middleware/handle-validation-error';
import handleDefaultError from './middleware/handle-default-error';
import { requestLogger, errorLogger } from './middleware/logger';

dotenv.config();
// noinspection SpellCheckingInspection - mestodb - название базы данных проекта.
void mongoose.connect('mongodb://localhost:27017/mestodb');

const app: Express = express();
const { PORT = 3000 } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errorLogger);
app.use(handleValidationError);
app.use(handleDefaultError);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ PORT }`);
});
