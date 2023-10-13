import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, './config.env') });

export type Config = Required<EnvConfig> & NonNullable<EnvConfig>;

export type EnvConfig = {
  DB?: string | undefined;
  PORT?: string;
  NODE_ENV?: string | undefined;
  AUTH_ACCESS_TOKEN_SECRET?: string | undefined;
  AUTH_ACCESS_TOKEN_EXPIRY?: string | undefined;
}

const getConfig = (): EnvConfig => {
  return {
    DB: process.env.DB,
    PORT: process.env.PORT
      ? process.env.PORT
      : '3000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    AUTH_ACCESS_TOKEN_SECRET: process.env.AUTH_ACCESS_TOKEN_SECRET,
    AUTH_ACCESS_TOKEN_EXPIRY: process.env.AUTH_ACCESS_TOKEN_EXPIRY,

  };
};

const getSanitizedConfig = (config: EnvConfig): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing key ${ key } in config.env`);
    }
  }
  return config as Config;
};

const config: EnvConfig = getConfig();

export const sanitizedConfig: Config = getSanitizedConfig(config);
