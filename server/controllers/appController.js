const Parking = require('../model/Parking.model');
const geolib = require('geolib'); // geolib library for distance calculation

async function createParking(req, res) {
  try {
    const {
      location,
      bikeHourly,
      bikeMonthly,
      carHourly,
      carMonthly,
      bikeHourlyRate,
      bikeMonthlyRate,
      carHourlyRate,
      carMonthlyRate,
      bike,
      car,
      bikeSlot,
      carSlot,
      cctv,
      guard,
      rules,
      images,
      fromTime,
      toTime,
    } = req.body;

    // Create a new parking object
    const parking = new Parking({
      location,
      bikeHourly,
      bikeMonthly,
      carHourly,
      carMonthly,
      bikeHourlyRate,
      bikeMonthlyRate,
      carHourlyRate,
      carMonthlyRate,
      bike,
      car,
      bikeSlot,
      carSlot,
      cctv,
      guard,
      rules,
      images,
      fromTime,
      toTime,
      user: req.user._id, // Set the user ID to the current user's ID
    });

    // Create a new attribute called parkingId from the last 6 digits of the _id field
    parking.parkingId = parking._id.toString().slice(-6);

    // Save the parking object to the database
    const savedParking = await parking.save();

    // Return the saved parking object as the response
    res.status(201).json(savedParking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingById(req, res) {
  try {
    const parkingId = req.params.id; // Get the ID of the parking spot from the request parameters

    // Find the parking spot by ID and populate the user field
    const parking = await Parking.findById(parkingId).populate('user');

    if (!parking) {
      // Return a 404 Not Found error if the parking spot doesn't exist
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    // Return the parking spot object as the response
    res.json(parking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingByLocation(req, res) {
  try {
    const { city, area, postCode } = req.query;

    const filter = {};
    if (city) {
      filter['location.city'] = city;
    }
    if (area) {
      filter['location.area'] = area;
    }
    if (postCode) {
      filter['location.postCode'] = postCode;
    }

    const parkings = await Parking.find(filter).populate('user');

    res.json(parkings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingByUserId(req, res) {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters

    // Find the parking spots that belong to the user and populate the user field
    const parkings = await Parking.find({ user: userId }).populate('user');

    // Return the parking spots as the response
    res.json(parkings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingByDistance(req, res) {
  try {
    const { latitude, longitude } = req.query; // Get the latitude and longitude of the user's location from the query parameters

    // Find all the parking spots and populate the user field
    const parkings = await Parking.find().populate('user');

    // Calculate the distance between the user's location and each parking spot's location
    const parkingDistances = parkings.map((parking) => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        {
          latitude: parking.location.latitude,
          longitude: parking.location.longitude,
        }
      );
      return { ...parking.toObject(), distance };
    });

    // Sort the list of parking spots by distance
    const sortedParkings = parkingDistances.sort(
      (a, b) => a.distance - b.distance
    );

    // Return the sorted list of parking spots as the response
    res.json(sortedParkings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingByRating(req, res) {
  try {
    // Find all the parking spots and populate the user field and ratings subdocument
    const parkings = await Parking.find()
      .populate('user')
      .populate('ratings.user');

    // Calculate the average rating for each parking spot
    const parkingRatings = parkings.map((parking) => {
      const ratingCount = parking.ratings.length;
      const ratingTotal = parking.ratings.reduce(
        (total, rating) => total + rating.rating,
        0
      );
      const ratingAvg = ratingCount > 0 ? ratingTotal / ratingCount : 0;
      return { ...parking.toObject(), ratingAvg };
    });

    // Sort the list of parking spots by average rating
    const sortedParkings = parkingRatings.sort(
      (a, b) => b.ratingAvg - a.ratingAvg
    );

    // Return the sorted list of parking spots as the response
    res.json(sortedParkings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function getParkingByVehicleType(req, res) {
  try {
    const { vehicleType } = req.query; // Get the vehicle type from the query parameters

    // Find the parking spots that match the vehicle type and populate the user field
    const parkings = await Parking.find({ [`${vehicleType}`]: true }).populate(
      'user'
    );

    // Return the parking spots as the response
    res.json(parkings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function updateParkingById(req, res) {
  try {
    const parkingId = req.params.id;
    const updates = req.body;

    // Update the parking spot and return the updated object
    const updatedParking = await Parking.findByIdAndUpdate(parkingId, updates, {
      new: true,
    }).populate('user');

    if (!updatedParking) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    res.json(updatedParking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function deleteParkingById(req, res) {
  try {
    const parkingId = req.params.id;

    // Delete the parking spot
    const deletedParking = await Parking.findByIdAndDelete(parkingId);

    if (!deletedParking) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    res.json(deletedParking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function createParkingRating(req, res) {
  try {
    const { parkingId, rating, comment } = req.body;
    const userId = req.user.id; // Assuming you have middleware that sets the user ID in the request object

    // Find the parking spot by ID and add the new rating
    const parking = await Parking.findByIdAndUpdate(
      parkingId,
      {
        $push: { ratings: { user: userId, rating, comment } },
      },
      { new: true }
    ).populate('user');

    if (!parking) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    // Calculate the new rating aggregate and update the parking spot
    const ratingCount = parking.ratings.length;
    const ratingTotal = parking.ratings.reduce(
      (total, rating) => total + rating.rating,
      0
    );
    const ratingAvg = ratingCount > 0 ? ratingTotal / ratingCount : 0;

    await Parking.findByIdAndUpdate(parkingId, {
      ratingCount,
      ratingTotal,
      ratingAvg,
    });

    res.json(parking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getAllParking = async (req, res) => {
  try {
    const parkingList = await Parking.find({});
    res.status(200).json(parkingList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const Booking = require('../model/Booking.model');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { parking, selectedDate, fromTime, toTime, endDate } = req.body;
    const user = req.user._id;

    // Check if the parking spot exists
    const parkingSpot = await Parking.findById(parking);
    if (!parkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    // Check if the parking spot is available for the selected time period
    const existingBooking = await Booking.findOne({
      parking,
      $or: [
        {
          $and: [
            { selectedDate },
            {
              $or: [
                {
                  $and: [
                    { fromTime: { $lte: fromTime } },
                    { toTime: { $gt: fromTime } },
                  ],
                },
                {
                  $and: [
                    { fromTime: { $lt: toTime } },
                    { toTime: { $gte: toTime } },
                  ],
                },
              ],
            },
          ],
        },
        {
          $and: [
            { endDate: { $gte: selectedDate } },
            {
              $or: [
                {
                  $and: [
                    { fromTime: { $lte: fromTime } },
                    { toTime: { $gt: fromTime } },
                  ],
                },
                {
                  $and: [
                    { fromTime: { $lt: toTime } },
                    { toTime: { $gte: toTime } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (existingBooking) {
      return res.status(400).json({
        message: 'Parking spot is not available for this time period',
      });
    }

    // Create a new booking
    const booking = new Booking({
      parking,
      selectedDate,
      fromTime,
      toTime,
      endDate,
      user,
    });
    const savedBooking = await booking.save();

    res.status(201).json({ message: 'Booking created', booking: savedBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  createParking,
  getAllParking,
  getParkingById,
  getParkingByLocation,
  getParkingByUserId,
  getParkingByDistance,
  getParkingByRating,
  getParkingByVehicleType,
  deleteParkingById,
  updateParkingById,
  createParkingRating,
};
