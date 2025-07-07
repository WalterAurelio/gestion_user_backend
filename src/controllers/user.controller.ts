import { Request, Response } from 'express';
import { RegisterBodyType } from '../middlewares/validateRegister';

export const registerUser = (database) => {
  return async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        res.sendStatus(400);
        return;
      }
      const userId = await database.registerUser(username, password);

      res.json({ userId });
    } catch (error) {
      res.sendStatus(500);
    }
  }
};

/* export const registerUser = (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
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
} */
