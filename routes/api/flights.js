// routes/api/flights.js

const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyTokenUser')
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


router.post('/flightcreate/', verify, (req, res) => {
  const { userId, admin } = req
  if (!admin)
    return res.status(401).send("Unauthorized Action")

  const { economySeats, firstSeats, businessSeats } = req.body
  economylist = []
  for (var i = 0; i < economySeats; i++) {
    economylist.push(false);
  }
  businesslist = []
  for (var i = 0; i < businessSeats; i++) {
    businesslist.push(false);
  }
  firstlist = []
  for (var i = 0; i < firstSeats; i++) {
    firstlist.push(false);
  }
  req.body.economySeats = economylist;
  req.body.businessSeats = businesslist;
  req.body.firstSeats = firstlist;
  req.body.availableTotalSeats = req.body.totalSeats;
  req.body.availableEconomySeats = economySeats;
  req.body.availableFirstSeats = firstSeats;
  req.body.availableBusinessSeats = businessSeats;

  flight.create(req.body)
    .then(flight => res.json({ msg: 'flight added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this flight' }));
});


router.post('/getdeparture0retrun', async (req,res)=>{
const {departureTicket,returnTicket} = req.body

if (departureTicket){
const flights =  await flight.find({$and:[{"to":departureTicket.from},{"from":departureTicket.to},{"departureDate":  { $gt : departureTicket.arrivalDate} } ]})
res.json(flights)
}

if (returnTicket){
  const flights =  await flight.find({$and:[{"to":returnTicket.from},{"from":returnTicket.to},{"arrivalDate":  { $lt : returnTicket.departureDate} } ]})
  res.json(flights)
  }


});



router.patch('/flightupdate/:id', verify, (req, res) => {
  const { userId, admin } = req
  if (!admin)
    return res.status(401).send("Unauthorized Action")

  const { economySeats, firstSeats, businessSeats, changeFlag } = req.body
  if (!changeFlag) {
    economylist = []
    for (var i = 0; i < economySeats; i++) {
      economylist.push(false);
    }
    businesslist = []
    for (var i = 0; i < businessSeats; i++) {
      businesslist.push(false);
    }
    firstlist = []
    for (var i = 0; i < firstSeats; i++) {
      firstlist.push(false);
    }
    req.body.economySeats = economylist;
    req.body.businessSeats = businesslist;
    req.body.firstSeats = firstlist;
    req.body.totalSeats = firstlist.length + businesslist.length + economylist.length
    req.body.availableTotalSeats = req.body.totalSeats;
    req.body.availableEconomySeats = economySeats;
    req.body.availableFirstSeats = firstSeats;
    req.body.availableBusinessSeats = businessSeats;
  }
  delete req.body.changeFlag;
  flight.findByIdAndUpdate(req.params.id, req.body)
    .then(flight => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.patch('/flightbookseats/', verify, async (req, res) => {

  const { flightId, economySeatsAdults, firstSeatsAdults, businessSeatsAdults, economySeatsChildren, firstSeatsChildren, businessSeatsChildren } = req.body
  let f = await flight.findById(flightId)

  for (var i = 0; i < economySeatsAdults.length; i++) {
    var j = economySeatsAdults[i];
    f.economySeats[j] = true;
  }
  f.availableEconomySeats -= economySeatsAdults.length;
  for (var i = 0; i < businessSeatsAdults.length; i++) {
    var j = businessSeatsAdults[i];
    f.businessSeats[j] = true;
  }
  f.availableBusinessSeats -= businessSeatsAdults.length;

  for (var i = 0; i < firstSeatsAdults.length; i++) {
    var j = firstSeatsAdults[i];
    f.firstSeats[j] = true;
  }
  f.availableFirstSeats -= firstSeatsAdults.length;


  for (var i = 0; i < economySeatsChildren.length; i++) {
    var j = economySeatsChildren[i];
    f.economySeats[j] = true;
  }
  f.availableEconomySeats -= economySeatsChildren.length;
  for (var i = 0; i < businessSeatsChildren.length; i++) {
    var j = businessSeatsChildren[i];
    f.businessSeats[j] = true;
  }
  f.availableBusinessSeats -= businessSeatsChildren.length;

  for (var i = 0; i < firstSeatsChildren.length; i++) {
    var j = firstSeatsChildren[i];
    f.firstSeats[j] = true;
  }
  f.availableFirstSeats -= firstSeatsChildren.length;



  f.availableTotalSeats -= (economySeatsAdults.length + businessSeatsAdults.length + firstSeatsAdults.length + economySeatsChildren.length + businessSeatsChildren.length + firstSeatsChildren.length);
  flight.findByIdAndUpdate(flightId, f)
    .then(f => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );

})
router.patch('/flightcancelseats/', verify, async (req, res) => {

  const { flightId, economySeatsAdults, firstSeatsAdults, businessSeatsAdults, economySeatsChildren, firstSeatsChildren, businessSeatsChildren } = req.body
  let f = await flight.findById(flightId)

  for (var i = 0; i < economySeatsAdults.length; i++) {
    var j = economySeatsAdults[i];
    f.economySeats[j] = false;
  }
  f.availableEconomySeats += economySeatsAdults.length;
  for (var i = 0; i < businessSeatsAdults.length; i++) {
    var j = businessSeatsAdults[i];
    f.businessSeats[j] = false;
  }
  f.availableBusinessSeats += businessSeatsAdults.length;

  for (var i = 0; i < firstSeatsAdults.length; i++) {
    var j = firstSeatsAdults[i];
    f.firstSeats[j] = false;
  }
  f.availableFirstSeats += firstSeatsAdults.length;


  for (var i = 0; i < economySeatsChildren.length; i++) {
    var j = economySeatsChildren[i];
    f.economySeats[j] = false;
  }
  f.availableEconomySeats += economySeatsChildren.length;
  for (var i = 0; i < businessSeatsChildren.length; i++) {
    var j = businessSeatsChildren[i];
    f.businessSeats[j] = false;
  }
  f.availableBusinessSeats += businessSeatsChildren.length;

  for (var i = 0; i < firstSeatsChildren.length; i++) {
    var j = firstSeatsChildren[i];
    f.firstSeats[j] = false;
  }
  f.availableFirstSeats += firstSeatsChildren.length;



  f.availableTotalSeats += (economySeatsAdults.length + businessSeatsAdults.length + firstSeatsAdults.length + economySeatsChildren.length + businessSeatsChildren.length + firstSeatsChildren.length);
  flight.findByIdAndUpdate(flightId, f)
    .then(f => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );

})


router.delete('/flightdelete/:id', verify, (req, res) => {

  const { userId, admin } = req
  if (!admin)
    return res.status(401).send("Unauthorized Action")

  flight.findByIdAndRemove(req.params.id, req.body)
    .then(flight => res.json({ mgs: 'flight entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a flight' }));
});



module.exports = router;