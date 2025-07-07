import { Router } from 'express';
import { validateRegister } from '../middlewares/validateRegister';
import { registerUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', () => {});
router.get('/logout', () => {});

export default router;