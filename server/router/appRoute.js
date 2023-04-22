const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  createParkingRating,
  createParking,
  getParkingById,
  getParkingByLocation,
  getParkingByUserId,
  getParkingByDistance,
  getNearbyParking,
  getParkingByRating,
  getParkingByVehicleType,
  deleteParkingById,
  updateParkingById,
  getAllParking,
  createBooking,
  getUserBookings,
  deleteBookingById,
  getAllBookMarkedParkings,
  addBookmark,
  removeBookmark,
  setOnHold,
  removeHold,
} = require('../controllers/appController');

const appRouter = express.Router();

// Public endpoints
appRouter.get('/parkings/all', getAllParking);
appRouter.get('/parkings/:id', getParkingById);
appRouter.get('/parkings', getParkingByLocation);
appRouter.get('/parkings/distance', getParkingByDistance);
appRouter.get('/parkings/nearby/:longitude/:latitude', getNearbyParking);
appRouter.get('/parkings/vehicle-type', getParkingByVehicleType);
appRouter.get('/parkings/rating', getParkingByRating);

// Private endpoints
appRouter.use(authMiddleware); // Requires authentication for all routes below this line
appRouter.post('/parkings', createParking);
appRouter.get('/parkings/user/:userId', getParkingByUserId);
appRouter.put('/parkings/:id', updateParkingById);
appRouter.delete('/parkings/:id', deleteParkingById);
appRouter.post('/parkings/ratings', createParkingRating);

// Booking endpoints
appRouter.post('/bookings', createBooking);
appRouter.get('/bookings/', getUserBookings);
appRouter.delete('/bookings/:id', deleteBookingById);

// Bookmark endpoints
appRouter.post('/bookmarks/:parkingId', addBookmark);
appRouter.delete('/bookmarks/:parkingId', removeBookmark);
appRouter.get('/bookmarks/', getAllBookMarkedParkings);

// OnHold endpoints
appRouter.put('/parking/onhold/:parkingId', setOnHold);
appRouter.put('/parking/removehold/:parkingId', removeHold);
module.exports = appRouter;
