import express, { Express } from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import routes from './routes';

const app: Express = express();

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// Use routes
app.use('/', routes);

export default app;
