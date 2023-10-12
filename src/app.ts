import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as process from 'process';

import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

import auth from './middleware/auth';
import handleValidationError from './middleware/handle-validation-error';
import handleDefaultError from './middleware/handle-default-error';
import { requestLogger, errorLogger } from './middleware/logger';
import config from './vendor/config';

dotenv.config();
const { PORT = 3000, DB } = process.env;
void mongoose.connect(DB || config.DB);

const app: Express = express();

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
