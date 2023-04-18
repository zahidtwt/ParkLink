const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  address: String,
  area: String,
  city: String,
  postCode: String,
  longitude: Number,
  latitude: Number,
  ptype: String,
});
const ratingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});
const parkingSchema = new Schema({
  parkingId: 'String',
  location: {
    type: locationSchema,
    required: true,
  },
  bikeHourly: Boolean,
  bikeMonthly: Boolean,
  carHourly: Boolean,
  carMonthly: Boolean,
  bikeHourlyRate: Number,
  bikeMonthlyRate: Number,
  carHourlyRate: Number,
  carMonthlyRate: Number,
  bike: Boolean,
  car: Boolean,
  bikeSlot: Number,
  carSlot: Number,
  cctv: Boolean,
  guard: Boolean,
  rules: [String],
  images: [String],
  fromTime: String,
  toTime: String,
  available: Boolean,
  ratings: [ratingSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;
