// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


const router = express.Router();

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen('8000', () => {
    console.log('Server is listening...');
});

