import process from 'process';

const { PORT = 3000, DB, NODE_ENV } = process.env;
// noinspection SpellCheckingInspection - mestodb - название базы данных проекта.
const config = {
  DB: DB || 'mongodb://localhost:27017/mestodb',
  PORT: PORT || 3000,
  NODE_ENV: NODE_ENV || 'development',
};

export default config;
