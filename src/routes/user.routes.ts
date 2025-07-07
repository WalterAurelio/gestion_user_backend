import { Router } from 'express';
import { validateRegister } from '../middlewares/validateRegister';
import { registerUser } from '../controllers/user.controller';

const router = Router();

export default function(database) {
  router.post('/register', validateRegister, registerUser(database));

  return router;
}

// router.post('/login', () => {});
// router.get('/logout', () => {});

// export default router;