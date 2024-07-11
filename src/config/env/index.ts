import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';

configDotenv();

const defaults = {
  NODE_ENV: process.env.GENERIC_API_NODE_ENV,
  PORT: process.env.GENERIC_API_PORT,
  DATABASE_URL: process.env.GENERIC_API_DATABASE_URL,
  PAPERTRAIL_PORT: process.env.GENERIC_API_PAPERTRAIL_PORT,
  PAPERTRAIL_URL: process.env.GENERIC_API_PAPERTRAIL_URL,
  APP_NAME: process.env.APP_NAME,
  DOMAIN: process.env.GENERIC_API_DOMAIN,
  SALT_ROUNDS: parseInt(process.env.GENERIC_API_SALT_ROUNDS as string),
  SECRET: process.env.GENERIC_API_SECRET,
  SENDGRID_API_KEY: process.env.GENERIC_API_SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.GENERIC_API_SENDGRID_EMAIL,
  VERIFY_ME_CLIENT_ID: process.env.GENERIC_API_VERIFY_ME_CLIENT_ID,
  VERIFY_ME_CLIENT_SECRET: process.env.GENERIC_API_VERIFY_ME_CLIENT_SECRET,
  PAYSTACK_SECRET_KEY: process.env.GENERIC_API_PAYSTACK_SECRET_KEY,
};
export default {
  development: { ...defaults, ...development },
  test: { ...defaults, ...test },
}[process.env.GENERIC_API_NODE_ENV || 'development'];
