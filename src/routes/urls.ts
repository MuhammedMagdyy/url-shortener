import { Router } from 'express';
import { urls } from '../controllers';
import { isAuth, limiter } from '../middlewares';

const router = Router();

router.post('/', isAuth, limiter, urls.shortenUrl);
router.get('/:code', urls.redirectUrl);

export { router as urlRouter };
