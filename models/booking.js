const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduleBookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleBooking', required: true },
  seatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seat', required: true },
  price: { type: Number, required: true },
  seatStatus: { type: String, enum: ['booked', 'available'], default: 'available' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
