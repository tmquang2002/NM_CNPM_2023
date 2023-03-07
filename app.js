// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();
// Connect to database
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

app.get("/api", (req, res) => {
  res.status(200).json("Hello");
})

app.listen(8000, () => {
    console.log('Server is listening...');
});

