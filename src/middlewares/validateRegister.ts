import z from 'zod';
import { Request, Response, NextFunction } from 'express';

const RegisterBody = z.object({
  username: z.string().min(4),
  password: z.string().min(4)
});

export type RegisterBodyType = Required<z.infer<typeof RegisterBody>>;

export const validateRegister = (req: Request<{}, {}, RegisterBodyType>, res: Response, next: NextFunction) => {
  const result = RegisterBody.safeParse(req.body);

  if (!result.success) {
    res.sendStatus(400);
    return;
  }

  next();
}