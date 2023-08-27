const express = require("express");
const app = express();
const database = require('./config/database');

app.use(express.json());
require('dotenv').config();

app.use('/api/v1', require('./routes/userRoutes'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port " + port + ".");
});

database();