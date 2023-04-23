const Reservation = require('../models/reservation');

const reservationController = {
    createReservation: async (req, res) => {
        try {
            const reservation = new Reservation(req.body);
            const savedReservation = await reservation.save();
            const QRCodeImage = generateQR(`${process.env.BASE_URL}/reservations/${savedReservation._id}/ticket`);
            res.status(201).json({
                reservation: savedReservation,
                QRCode: QRCodeImage
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
    },

//     getAllReservations: async (req, res) => {
//         try {
//             const reservations = await Reservation.find({});
//             res.status(200).json(reservations);
//         } catch (e) {
//             res.status(400).send(e);
//         }
//     },

//     // Get reservation by id
//     getReservationById: async (req, res) => {
//         const _id = req.params.id;
//         try {
//             const reservation = await Reservation.findById(_id);
//             return !reservation ? res.status(404).json({error: 'Reservation not found'}) : res.status(200).json(reservation);
//         } catch (e) {
//             return res.status(400).json({error: e.message});
//         }
//     },
  
//     // Get reservation checkin by id
//     getReservationCheckinById: async (req, res) => {
//         const _id = req.params.id;
//         try {
//             const reservation = await Reservation.findById(_id);
//             reservation.checkin = true;
//             await reservation.save();
//             return !reservation ? res.status(404).json({error: 'Reservation not found'}) : res.status(200).json(reservation);
//         } catch (e) {
//             return res.status(400).json({error: e.message});
//         }
//     },
  
//   // Update reservation by id
//     updateReservationById: async (req, res) => {
//         const _id = req.params.id;
//         const updates = Object.keys(req.body);
//         const allowedUpdates = [
//         'userId',
//         'showtimeId',
//         'originalPrice',
//         'totalPrice'
//         ];
//         const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    
//         if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });
    
//         try {
//             const reservation = await Reservation.findById(_id);
//             updates.forEach((update) => (reservation[update] = req.body[update]));
//             await reservation.save();
//             return !reservation ? res.status(404).json({error: 'Reservation not found'}) : res.status(200).json(reservation);
//         } catch (e) {
//             return res.status(400).json({error: e.message});
//         }
//     },
  
//   // Delete reservation by id
//     deleteReservationById: async (req, res) => {
//         const _id = req.params.id;
//         try {
//             const reservation = await Reservation.findByIdAndDelete(_id);
//         return !reservation ? res.status(404).json({error: 'Reservation not found'}) : res.status(200).json(reservation);
//         } catch (e) {
//             return res.status(400).json({error: e.message});
//         }
//     },
  
}

module.exports = reservationController;