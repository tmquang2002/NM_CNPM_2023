const Showtime = require('../models/showtime');
const Movie = require('../models/movie');
const Theatre = require('../models/theatre');
const getFormattedMovieTitle = require('../utils/getFormattedMovieTitle');
const fs = require('fs');


const showtimeController = {
  createShowtime: async (req, res) => {
    const showtime = new Showtime(req.body);

    const showtimeExists = await Showtime.exists({ movieId: req.body.movieId });
    if (showtimeExists)
      return res.status(409).json({ error: 'Showtime already exists' });

    try {
      await showtime.save();
      res.status(201).json(showtime);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getAllShowtimes: async (req, res) => {
    try {
      const showtimes = await Showtime.find({}).populate('movieId');
      res.status(200).json(showtimes);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  getNowShowing: async (req, res) => {
    try {
      const now = new Date();
      const showtimes = await Showtime.find({
        startDate: { $lte: now },
        endDate: { $gte: now },
        isActive: true,
      }).populate('movieId');
  
      const movies = showtimes.map((showtime) => ({
        movieTitle: showtime.movieId.title,
        movieImage: showtime.movieId.image,
        showtimeId: showtime._id,
      }));
  
      res.status(200).json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },  

  getUpcoming: async (req, res) => {
    try {
      const now = new Date();
      const upcomingShowtimes = await Showtime.find({
        $or: [
          { startDate: { $eq: null } },
          { startDate: { $gt: now } }
        ]
      })
        .populate('movieId');
      const upcomingMovies = upcomingShowtimes.map(showtime => ({
        movieTitle: showtime.movieId.title,
        movieImage: showtime.movieId.image,
        showtimeId: showtime._id,
      }));
      res.status(200).json(upcomingMovies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getShowtimeById: async (req, res) => {
    const showtimeId = req.params.id;
  
    try {
      const showtime = await Showtime.findById(showtimeId).populate('movieId').exec();
      if (!showtime) {
        return res.status(404).json({ error: 'Showtime not found' });
      }
    
      const movie = await Movie.findById(showtime.movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      const theatreIds = showtime.times.flatMap(timeSlot => timeSlot.map(t => t.theatreId));
      const theatres = await Theatre.find({ _id: { $in: theatreIds } });
  
      const getTheatreName = (theatreId) => {
        const theatre = theatres.find(t => t._id.toString() === theatreId.toString());
        return theatre ? theatre.name : '';
      };
  
      const showtimeDetails = {
        id: showtime._id,
        movie: movie,
        startDate: showtime.startDate,
        endDate: showtime.endDate,
        isActive: showtime.isActive,
        times: showtime.times.flatMap(timeSlot => timeSlot.map(t => ({
          theatreId: t.theatreId,
          theatreName: getTheatreName(t.theatreId),
          time: t.time,
        }))),
      };
  
      res.status(200).json(showtimeDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getShowtimeByUrl: async (req, res) => {
    const showtimeUrl = req.params.url;
  
    try {
      const showtime = await Showtime.findOne({url: showtimeUrl}).populate('movieId').exec();
      if (!showtime) {
        return res.status(404).json({ error: 'Showtime not found' });
      }
    
      const movie = await Movie.findById(showtime.movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      const theatreIds = showtime.times.flatMap(timeSlot => timeSlot.map(t => t.theatreId));
      const theatres = await Theatre.find({ _id: { $in: theatreIds } });
  
      const getTheatreName = (theatreId) => {
        const theatre = theatres.find(t => t._id.toString() === theatreId.toString());
        return theatre ? theatre.name : '';
      };

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
  

      const showtimeDetails = {
        id: showtime._id,
        movie: movie,
        startDate: showtime.startDate,
        endDate: showtime.endDate,
        isActive: showtime.isActive,
        times: showtime.times.flatMap(timeSlot => timeSlot.map(t => {
          const showtimeDate = new Date(t.date);          
          if (showtimeDate >= currentDate) {
            return {
              date: t.date,
              theatreId: t.theatreId,
              theatreName: getTheatreName(t.theatreId),
              time: t.time,
            };
          }
          
          return null;
        })).filter(Boolean),
      };
  
      res.status(200).json(showtimeDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  updateShowtimeById: async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['movieId', 'theatreId', 'startDate', 'endDate', 'times', 'isActive'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ error: 'Invalid updates' });

    try {
      const showtime = await Showtime.findById(_id);
      if (!showtime) return res.sendStatus(404);
      updates.forEach((update) => (showtime[update] = req.body[update]));
      await showtime.save();
      return res.status(200).json(showtime);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  deleteShowtimeById: async (req, res) => {
    const _id = req.params.id;
    try {
      const showtime = await Showtime.findByIdAndDelete(_id);
      if (!showtime) return res.sendStatus(404);
      return res.status(200).json(showtime);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  uploadShowtimes: async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Read the uploaded file
      const fileData = fs.readFileSync(file.path, 'utf-8');
      let showtimes = JSON.parse(fileData);
  
      // Modify the date format of startDate and endDate fields
      showtimes = showtimes.map(async (showtime) => {
        const formattedTitle = await getFormattedMovieTitle(showtime.movieId);
        showtime.url = formattedTitle;
  
        return showtime;
      });
  
      showtimes = await Promise.all(showtimes);
  
      fs.unlinkSync(file.path);
  
      // Check if any of the showtimes already exist in the database
      const existingShowtimes = await Showtime.find({
        $or: showtimes.map(showtime => ({
          url: showtime.url,
          movieId: showtime.movieId,
          theatreId: showtime.theatreId,
          startDate: showtime.startDate,
          endDate: showtime.endDate
        }))
      });
  
      if (existingShowtimes.length > 0) {
        const existingShowtimesMsg = existingShowtimes.map(showtime =>
          `Movie ID ${showtime.movieId} already has a showtime on ${showtime.startDate.toISOString()} - ${showtime.endDate.toISOString()}`
        ).join(', ');
        return res.status(400).json({ error: `The following showtimes already exist: ${existingShowtimesMsg}` });
      }
  
      // Add showtimes to the database
      const createdShowtimes = await Showtime.insertMany(showtimes);
  
      // Send response
      res.status(201).json({ message: 'Showtimes added successfully', createdShowtimes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding showtimes' });
    }
  },

  deleteShowtimes: async (req, res) => {
    try {
      await Showtime.deleteMany({});
      res.status(200).json({ message: 'All showtimes have been deleted.' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = showtimeController;
