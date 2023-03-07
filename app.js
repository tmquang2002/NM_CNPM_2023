// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./routes/user');

dotenv.config();
//Connect to database
mongoose.connect(process.env.MONGODB_URI).then(
  () => {console.log("Connected to database!");},
  err => {
    console.log(err);
  }
);

const app = express();

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/api/user", userRoute);

app.listen(8000, () => {
    console.log('Server is listening...');
});

