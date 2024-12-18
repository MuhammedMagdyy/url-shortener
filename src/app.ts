import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const { NODE_ENV = 'development' } = process.env;
const app = express();
const logger =
  NODE_ENV === 'development'
    ? morgan('dev')
    : morgan('combined', {
        skip: (_, res) => res.statusCode < 500,
      });

app.use(logger);
app.use(helmet());
app.use(cors());
app.use(express.json());

export default app;
