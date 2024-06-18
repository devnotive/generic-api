import { configDotenv } from 'dotenv';
import development from './development';
import test from './test';

configDotenv();

//TODO change name from purplevest

const defaults = {
  NODE_ENV: process.env.PURPLE_VEST_NODE_ENV,
  PORT: process.env.PURPLE_VEST_PORT,
  DATABASE_URL: process.env.PURPLE_VEST_DATABASE_URL,
  PAPERTRAIL_PORT: process.env.PURPLE_VEST_PAPERTRAIL_PORT,
  PAPERTRAIL_URL: process.env.PURPLE_VEST_PAPERTRAIL_URL,
  APP_NAME: process.env.APP_NAME,
  DOMAIN: process.env.PURPLE_VEST_DOMAIN,
  SALT_ROUNDS: parseInt(process.env.PURPLE_VEST_SALT_ROUNDS as string),
  SECRET: process.env.PURPLE_VEST_SECRET,
  SENDGRID_API_KEY: process.env.PURPLE_VEST_SENDGRID_API_KEY,
  SENDGRID_EMAIL: process.env.PURPLE_VEST_SENDGRID_EMAIL,
  VERIFY_ME_CLIENT_ID: process.env.PURPLE_VEST_VERIFY_ME_CLIENT_ID,
  VERIFY_ME_CLIENT_SECRET: process.env.PURPLE_VEST_VERIFY_ME_CLIENT_SECRET,
  PAYSTACK_SECRET_KEY: process.env.PURPLE_VEST_PAYSTACK_SECRET_KEY,
};
export default {
  development: { ...defaults, ...development },
  test: { ...defaults, ...test },
}[process.env.PURPLE_VEST_NODE_ENV || 'development'];
