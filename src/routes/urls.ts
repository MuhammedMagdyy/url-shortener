import { Router } from 'express';
import { urls } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.use(isAuth);
router.post('/', urls.shortenUrl);
router.get('/:code', urls.redirectUrl);

export { router as urlRouter };
