import mongoose from 'mongoose';
import { sanitizedConfig } from '../vendor/constants/config';

const connectDatabase = () => {
  mongoose
    .connect(sanitizedConfig.DB)
    .then((connection) => sanitizedConfig.NODE_ENV === 'development'
      && console.log(`🟢 Mongo DB connected to ${ connection.connection?.host }:${ connection.connection?.port }/${ connection.connection?.name }!`))
    .catch((err) => {
      console.log(`Произошла ошибка при подсоединении к MongoDB: ${ err }`);
    });

};

export default connectDatabase;
