import mongoose from 'mongoose';
import app from './app';
import { logger } from './modules/logger/logger';
import { mongooseConfig } from './config/mongoose';
import { PORT } from './env';

let server: any;
mongoose.connect(mongooseConfig.url).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
