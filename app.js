// app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require("dotenv")
const app = express();
dotenv.config()

//routes

const flights = require('./routes/api/flights');

// Connect Database
connectDB();
app.use(cors({origin: true, credentials: true}));
app.use(express.json({extended: false})); 
app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/flights', flights);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));