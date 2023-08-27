const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

const connectDB = () => {
    mongoose.connect(databaseUrl)
    .then(() => {
        console.log("Database connected.");
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    });
} 

module.exports = connectDB;