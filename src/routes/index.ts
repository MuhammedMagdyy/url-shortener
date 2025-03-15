import { Router } from 'express';
import { OK } from '../utils';
import { urlRouter } from './urls';
import { userRouter } from './users';
import { visitRouter } from './visits';

const router = Router();

router.get('/health', (_req, res) => {
  const uptime = process.uptime();

  res.status(OK).json({
    message: `I'm healthy 🏋️‍♂️`,
    uptime: `${Math.floor(uptime / 60)} minutes`,
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', userRouter);
router.use('/url', urlRouter);
router.use('/analytics', visitRouter);

export default router;
