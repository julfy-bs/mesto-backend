import cors from 'cors';
import express, { Express } from 'express';
import { createUser, login } from './controllers/users';
import NotFoundError from './errors/not-found-error';
import connectDatabase from './helpers/connect-database';

import auth from './middleware/auth';
import handleDefaultError from './middleware/handle-default-error';
import handleValidationError from './middleware/handle-validation-error';
import { errorLogger, requestLogger } from './middleware/logger';
import cardsRouter from './routes/cards';

import usersRouter from './routes/users';

import { sanitizedConfig } from './vendor/constants/config';
import { ErrorText } from './vendor/constants/error-text';
import userValidation from './vendor/validation/user';

void connectDatabase();
const app: Express = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);
app.post('/signin', userValidation.login, login);
app.post('/signup', userValidation.signup, createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.all('/*', () => {
  throw new NotFoundError(ErrorText.ServerPageNotFound)
});
app.use(errorLogger);
app.use(handleValidationError);
app.use(handleDefaultError);

app.listen(sanitizedConfig.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ sanitizedConfig.PORT }`);
});
