const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require('../database/connection');

describe('Test Parking API', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  describe('GET All Parkings', () => {
    test('It should respond with 200 success and an array', async () => {
      const res = await request(app)
        .get('/app/parkings/all')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
