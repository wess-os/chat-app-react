const express = require('express');
const cors = require('cors');
const { db } = require('./database/db');
const userRoute = require('./routes/userRoute');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoute);

const port = process.env.PORT || 5000;

const server = () => {
  db();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

server();