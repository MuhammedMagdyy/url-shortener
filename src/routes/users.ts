import { Router } from 'express';
import { users } from '../controllers';

const router = Router();

router.post('/register', users.register);
router.post('/login', users.login);

export { router as userRouter };
