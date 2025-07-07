import app from '../app';
import request from 'supertest';
import { RegisterBodyType } from '../middlewares/validateRegister';

describe('POST /register', () => {

  describe('given a username and password', () => {

    test('responds with a 200 status code', async () => {
      const response = await request(app).post('/api/auth/register').send({
        username: 'username',
        password: 'password'
      } as RegisterBodyType);

      expect(response.statusCode).toBe(200);
    });

    // test('specifies json in content-type header', () => {});

    // test('response has message', () => {});

  })

});