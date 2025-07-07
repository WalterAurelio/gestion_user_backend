import makeApp from '../app';
import request from 'supertest';
import { RegisterBodyType } from '../middlewares/validateRegister';
import { jest } from '@jest/globals';

const registerUser = jest.fn<(username: string, password: string) => Promise<number>>();

const app = makeApp({
  registerUser
})

describe('POST /register', () => {
  describe('given a username and password', () => {
    const requestPromise = request(app).post('/api/auth/register').send({
      username: 'username',
      password: 'password'
    });

    test('saves username and password to the database', async () => {
      const bodyData: RegisterBodyType[] = [
        { username: 'username1', password: 'password1' },
        { username: 'username2', password: 'password2' },
        { username: 'username3', password: 'password3' }
      ];

      for (const body of bodyData) {
        registerUser.mockReset();
        await request(app).post('/api/auth/register').send(body);
        expect(registerUser.mock.calls.length).toBe(1);
        expect(registerUser.mock.calls[0][0]).toBe(body.username);
        expect(registerUser.mock.calls[0][1]).toBe(body.password);
      }
    });

    test('responds with a json containing userId', async () => {
      for (let i = 0; i < 10; i++) {
        registerUser.mockReset();
        registerUser.mockResolvedValue(i);
        const response = await request(app).post('/api/auth/register').send({
          username: 'username',
          password: 'password'
        });
        expect(response.body.userId).toBe(i);
      }
    });

    test('responds with a 200 status code', async () => {
      const response = await requestPromise;
      expect(response.statusCode).toBe(200);
    });

    test('specifies json in content-type header', async () => {
      const response = await requestPromise;
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('response has userId attribute', async () => {
      const response = await requestPromise;
      expect(response.body.userId).toBeDefined();
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