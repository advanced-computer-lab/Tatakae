// routes/api/flights.js

const express = require('express');
const router = express.Router();

// Load flight model
const flight = require('../../models/flight');

// @route GET api/flights/test
// @description tests flights route
// @access Public
router.get('/test', (req, res) => res.send('flight route testing!'));
//http://localhost:8000/test
// @route GET api/flights
// @description Get all flights
// @access Public
router.get('/flightgetall', (req, res) => {
  flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No flights found' }));
});

// @route GET api/flights/:id
// @description Get single flight by id
// @access Public
router.get('/flightget/:id', (req, res) => {
  flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(404).json({ noflightfound: 'No flight found' }));
});

// @route GET api/flights
// @description add/save flight
// @access Public
router.post('/flightcreate/', (req, res) => {
  flight.create(req.body)
    .then(flight => res.json({ msg: 'flight added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});

// @route GET api/flights/:id
// @description Update flight
// @access Public
router.patch('/flightupdate/:id', (req, res) => {
  flight.findByIdAndUpdate(req.params.id, req.body)
     .then(flight => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

// @route GET api/flights/:id
// @description Delete flight by id
// @access Public
router.delete('/flightdelete/:id', (req, res) => {
  flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});

module.exports = router;