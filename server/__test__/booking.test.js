const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const {
  connectToDatabase,
  disconnectFromDatabase,
} = require('../database/connection');
const data = {
  parking_id: new mongoose.Types.ObjectId(),
  selectedDate: '2023-05-02T00:00:00.000+00:00',
  fromTime: '9:00',
  toTime: '12:00',
  endDate: '2023-05-04T00:00:00.000+00:00',
  cost: 0,
  bookingId: 'TEST_TEST',
};

describe('Test Parking API', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterAll(async () => {
    await disconnectFromDatabase();
  });

  describe('Create booking', () => {
    test('It should respond with 200 success and send an array', async () => {
      const res = await request(app)
        .post('/app/bookings')
        .send(data)
        .expect(404)
        .expect('Content-Type', /json/);

      expect(res.body.message).toBe('Parking spot not found');
    });
  });
});
