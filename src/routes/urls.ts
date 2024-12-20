import { Router } from 'express';
import { urls } from '../controllers';
import { isAuth } from '../middlewares';

const router = Router();

router.post('/', isAuth, urls.shortenUrl);
router.get('/:code', urls.redirectUrl);

export { router as urlRouter };
