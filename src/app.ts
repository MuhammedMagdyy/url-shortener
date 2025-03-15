import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaDatabaseClient } from './database';
import { errorHandler } from './middlewares';
import routes from './routes';
import { ApiError, logger, NOT_FOUND } from './utils';

const app = express();
const prismaClient = PrismaDatabaseClient.getInstance();
const port = process.env.PORT ?? 8080;

app.get('/', (_, res) => {
  res.send(
    '<div style="text-align: center; margin-top: 20px;"><h1>Welcome to URL Shortener API 🚀</h1></div>',
  );
});

app.set('trust proxy', 1);
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.all('*', (req, _res, next) => {
  logger.error(`${req.method} ${req.originalUrl} not found`);
  return next(
    new ApiError(
      `Seems like you're lost 🧐 - ${req.method} ${req.originalUrl} not found ❌`,
      NOT_FOUND,
    ),
  );
});
app.use(errorHandler);

export const up = async () => {
  try {
    await prismaClient.connect();

    const server = app.listen(port, () => {
      logger.info(`Server is running on ${port} 🚀`);
    });

    process.on('SIGINT', () => {
      logger.warn('Shutting down gracefully...');

      prismaClient
        .disconnect()
        .then(() => {
          server.close(() => {
            logger.info('Server closed successfully! 👋');
            process.exit(0);
          });
        })
        .catch((error) => {
          logger.error(`Error occurred during shutdown - ${error} ❌`);
          process.exit(1);
        });
    });
  } catch (error) {
    logger.error(`Error occurred while starting the server - ${error} ❌`);
    process.exit(1);
  }
};
