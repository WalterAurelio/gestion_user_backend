import app from '../app';
import request from 'supertest';
import { RegisterBodyType } from '../middlewares/validateRegister';

describe('POST /register', () => {
  describe('given a username and password', () => {
    const requestPromise = request(app).post('/api/auth/register').send({
        username: 'username',
        password: 'password'
      });

    test('responds with a 200 status code', async () => {
      const response = await requestPromise;
      expect(response.statusCode).toBe(200);
    });

    test('specifies json in content-type header', async () => {
      const response = await requestPromise;
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('response has message', async () => {
      const response = await requestPromise;
      expect(response.body.message).toBeDefined();
    });
  });

  describe('when username and/or password are missing', () => {
    test('responds with a 400 status code', async () => {
      const bodyData: Partial<RegisterBodyType>[] = [
        { username: 'username' },
        { password: 'password' },
        {}
      ];

      for (const body of bodyData) {
        const response = await request(app).post('/api/auth/register').send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });

  describe('when username and/or password are shorter than min length (4)', () => {
    test('responds with a 400 status code', async () => {
      const bodyData: Partial<RegisterBodyType>[] = [
        { username: 'use', password: 'password' },
        { username: 'username', password: 'pas' },
        { username: 'use', password: 'pas' }
      ];

      for (const body of bodyData) {
        const response = await request(app).post('/api/auth/register').send(body);
        expect(response.statusCode).toBe(400);
      }
    })
  })
});