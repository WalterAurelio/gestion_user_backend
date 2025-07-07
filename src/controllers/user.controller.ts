import { Request, Response } from 'express';
import { RegisterBodyType } from '../middlewares/validateRegister';

export const registerUser = (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.sendStatus(400);
      return;
    }

    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.sendStatus(500);
  }
}