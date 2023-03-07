const mongoose = require('mongoose');

const scheduleBookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  scheduleDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});

const ScheduleBooking = mongoose.model('ScheduleBooking', scheduleBookingSchema);

module.exports = ScheduleBooking;
