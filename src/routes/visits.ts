import { Router } from 'express';
import { visits } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.use(isAuth);
router.get('/:code', visits.analytics);

export { router as visitRouter };
