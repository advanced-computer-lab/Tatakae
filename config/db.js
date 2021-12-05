const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv')
dotenv.config()
const db = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@flightsdb.mnfjr.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority"


const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;