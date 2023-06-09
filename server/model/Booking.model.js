const mongoose = require('mongoose');
const { Schema } = mongoose;
const bookingSchema = new Schema({
  bookingId: 'String',
  parking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parking',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
  },
  cost: {
    type: Number,
  },
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
