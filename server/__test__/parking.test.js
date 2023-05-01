const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Test Parking API', () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
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
