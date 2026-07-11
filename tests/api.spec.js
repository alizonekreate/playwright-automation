require('dotenv').config();
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reqres.in/api';
const API_KEY = process.env.API_KEY;

test.describe('ReqRes API Tests', () => {

  // USERS
  test.describe('Users', () => {

    test('GET /users - should return list of users', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users?page=2`, {
        headers: { 'x-api-key': API_KEY }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.data).toBeTruthy();
      expect(Array.isArray(body.data)).toBe(true);
    });

    test('GET /users/2 - should return single user', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users/2`, {
        headers: { 'x-api-key': API_KEY }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.data.id).toBe(2);
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('first_name');
    });

    test('GET /users/23 - should return 404 for unknown user', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/users/23`, {
        headers: { 'x-api-key': API_KEY }
      });

      expect(response.status()).toBe(404);
    });

    test('POST /users - should create a new user', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/users`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          name: 'Alison Kate Lachica',
          job: 'QA Automation Engineer'
        }
      });

      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.name).toBe('Alison Kate Lachica');
      expect(body.job).toBe('QA Automation Engineer');
      expect(body).toHaveProperty('id');
      expect(body).toHaveProperty('createdAt');
    });

    test('PUT /users/2 - should update a user', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/users/2`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          name: 'Alison Kate Lachica',
          job: 'Senior QA Engineer'
        }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('updatedAt');
    });

    test('DELETE /users/2 - should delete a user', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/users/2`, {
        headers: { 'x-api-key': API_KEY }
      });

      expect(response.status()).toBe(204);
    });

  });

  // LOGIN
  test.describe('Login', () => {

    test('POST /login - should login successfully', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/login`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          email: 'eve.holt@reqres.in',
          password: 'cityslicka'
        }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('token');
      expect(body.token).toBeTruthy();
    });

    test('POST /login - should fail without password', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/login`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          email: 'eve.holt@reqres.in'
        }
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body).toHaveProperty('error');
      expect(body.error).toBe('Missing password');
    });

  });

  // REGISTER
  test.describe('Register', () => {

    test('POST /register - should register successfully', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/register`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          email: 'eve.holt@reqres.in',
          password: 'pistol'
        }
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('token');
      expect(body).toHaveProperty('id');
    });

    test('POST /register - should fail without password', async ({ request }) => {
      const response = await request.post(`${BASE_URL}/register`, {
        headers: { 'x-api-key': API_KEY },
        data: {
          email: 'sydney@fife.com'
        }
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body).toHaveProperty('error');
    });

  });

});