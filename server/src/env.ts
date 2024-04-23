import { resolve } from 'path';

const { env } = process;

export const { NODE_ENV } = env;

export const { PORT } = env;

export const { COOKIE_SECRET } = env;

export const { CLIENT_URL } = env;

export const PUBLIC_PATH = env.PUBLIC_PATH ?? resolve(__dirname, '..', '..', 'client', 'dist');
