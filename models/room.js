const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  row: { type: Number, required: true },
  number: { type: Number, required: true }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
