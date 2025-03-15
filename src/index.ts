import * as app from './app';
import { logger } from './utils';

app.up().catch((error) => {
  logger.error(`Error occurred while starting the server - ${error} ❌`);
  process.exit(1);
});
