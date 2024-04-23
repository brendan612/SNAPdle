import express, { Express } from 'express';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';
import { PUBLIC_PATH } from './env';

const app: Express = express();

// serve static files
app.use(express.static(PUBLIC_PATH));

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// Use routes
app.use('/', routes);

export default app;
