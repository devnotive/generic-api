import { z } from 'zod';
import { AppEnv } from '../enums';

export interface EnvProps {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    SWAGGER_ROUTE: string;
    APP_NAME: string;
    SALT_ROUNDS: number;
    SECRET: string;
    DOMAIN: string;
    VERIFY_ME_CLIENT_ID: string;
    VERIFY_ME_CLIENT_SECRET: string;
    PAYSTACK_SECRET_KEY: string;
}

export const envValidatorSchema = z.object({
    PORT: z.string().default('8000'),
    NODE_ENV: z.string().default(AppEnv.DEVELOPMENT),

    DATABASE_URL: z.string(),

    SWAGGER_ROUTE: z.string().default('/api/docs'),

    APP_NAME: z.string(),

    SALT_ROUNDS: z.number(),

    SECRET: z.string(),

    DOMAIN: z.string(),

    SENDGRID_API_KEY: z.string(),

    SENDGRID_EMAIL: z.string(),

    VERIFY_ME_CLIENT_ID: z.string(),

    VERIFY_ME_CLIENT_SECRET: z.string(),

    PAYSTACK_SECRET_KEY: z.string(),
});
