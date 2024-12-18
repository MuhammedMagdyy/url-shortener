import { Router } from 'express';

const router = Router();

router.get('/health', (_, res) => {
  res.status(200).json({ message: `I'm healthy 🤸‍♂️` });
});

export default router;
