import express, { Request, Response } from 'express';
import router from './routes/user.routes';

export default function(database) {
  const app = express();
  app.use(express.json());

  app.use('/api/auth', router(database));

  return app;
}
