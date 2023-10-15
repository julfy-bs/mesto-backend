import { Config } from '../../vendor/constants/config';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Readonly<Config> {}
  }
}

export {};
