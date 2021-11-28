// app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();


//routes

const flights = require('./routes/api/flights');
const users = require('./routes/api/users');
const tickets = require('./routes/api/tickets');


// Connect Database
connectDB();
app.use(cors({origin: true, credentials: true}));
app.use(express.json({extended: false})); 
app.use('/api/flights', flights);
app.use('/api/users', users);
app.use('/api/tickets', tickets);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));