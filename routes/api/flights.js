// routes/api/flights.js

const express = require('express');
const router = express.Router();

// Load flight model
const flight = require('../../models/flight');



router.get('/flightgetall', (req, res) => {
  flight.find()
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ noflightsfound: 'No flights found' }));
});


router.get('/flightget/:id', (req, res) => {
  flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(404).json({ noflightfound: 'No flight found' }));
});

router.post('/flightcreate/', (req, res) => {
  const {economySeats,firstSeats,businessSeats} = req.body
  economylist = []
  for (var i = 0 ; i < economySeats ; i ++){
    economylist.push(false);
  }
  businesslist = []
  for (var i = 0 ; i < businessSeats ; i ++){
    businesslist.push(false);
  }
  firstlist = []
  for (var i = 0 ; i < firstSeats ; i ++){
    firstlist.push(false);
  }
  req.body.economySeats = economylist ;
  req.body.businessSeats = businesslist;
  req.body.firstSeats = firstlist;
  req.body.availableSeats = req.body.totalSeats;
  flight.create(req.body)

    .then(flight => res.json({ msg: 'flight added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});


router.patch('/flightupdate/:id', (req, res) => {
  flight.findByIdAndUpdate(req.params.id, req.body)
     .then(flight => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

router.patch('/flightbookseats/',async (req,res)=>{
const{flightId,economySeats,firstSeats,businessSeats} = req.body
let f = await flight.findById(flightId)

for (var i = 0 ; i < economySeats.length ; i++){
  var j = economySeats[i];
  f.economySeats[j] = true;
}
for (var i = 0 ; i < businessSeats.length ; i++){
  var j = businessSeats[i];
  f.businessSeats[j] = true;
}
for (var i = 0 ; i < firstSeats.length ; i++){
  var j = firstSeats[i];
  f.firstSeats[j] = true;
}
f.availableSeats -= (economySeats.length+businessSeats.length+firstSeats.length);
flight.findByIdAndUpdate(flightId, f)
     .then(f => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );

})
router.patch('/flightcancelseats/',async (req,res)=>{
  const{flightId,economySeats,firstSeats,businessSeats} = req.body
let f = await flight.findById(flightId)

for (var i = 0 ; i < economySeats.length ; i++){
  var j = economySeats[i];
  f.economySeats[j] = false;
}
for (var i = 0 ; i < businessSeats.length ; i++){
  var j = businessSeats[i];
  f.businessSeats[j] = false;
}
for (var i = 0 ; i < firstSeats.length ; i++){
  var j = firstSeats[i];
  f.firstSeats[j] = false;
}
f.availableSeats += (economySeats.length+businessSeats.length+firstSeats.length);
flight.findByIdAndUpdate(flightId, f)
     .then(f => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );

  })

// @route GET api/flights/:id
// @description Delete flight by id
// @access Public
router.delete('/flightdelete/:id', (req, res) => {
  flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});

module.exports = router;