const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createParkingRating,
  createParking,
  getParkingById,
  getParkingByLocation,
  getParkingByUserId,
  getParkingByDistance,
  getParkingByRating,
  getParkingByVehicleType,
  deleteParkingById,
  updateParkingById,
} = require('../controllers/appController');

const appRouter = express.Router();

// Public endpoints
appRouter.get('/parkings/:id', getParkingById);
appRouter.get('/parkings', getParkingByLocation);
appRouter.get('/parkings/distance', getParkingByDistance);
appRouter.get('/parkings/vehicle-type', getParkingByVehicleType);
appRouter.get('/parkings/rating', getParkingByRating);

// Private endpoints
appRouter.use(authMiddleware); // Requires authentication for all routes below this line
appRouter.post('/parkings', createParking);
appRouter.get('/users/:userId/parkings', getParkingByUserId);
appRouter.put('/parkings/:id', updateParkingById);
appRouter.delete('/parkings/:id', deleteParkingById);
appRouter.post('/parkings/ratings', createParkingRating);

module.exports = appRouter;
