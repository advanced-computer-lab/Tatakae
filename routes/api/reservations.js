// routes/api/reservations.js

const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyTokenUser')

// Load reservation model
const reservation = require('../../models/reservation');



router.get('/reservationgetall', (req, res) => {
  reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(404).json({ noreservationsfound: 'No reservations found' }));
});


router.get('/reservationget/:id', (req, res) => {
  reservation.findById(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(404).json({ noreservationfound: 'No reservation found' }));
});
router.patch('/reservationupdate/:id', (req, res) => {
  const reservation =  reservation.findByIdAndUpdate(req.params.id, req.body)
     .then(reservation => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

////////   THE USEFUL APIs


router.get('/getuserreservations/',verify, (req, res) => {

  const {userId , admin} = req 
  if (admin) return res.status(401).send("Unauthorized Action")

  reservation.find({user : userId})
    .then(reservation => res.json(reservation))
    .catch(err => res.status(404).json({ noreservationfound: 'No reservation found' }));
});



router.post('/reservationcreate/',verify,async (req, res) => {
  
  const {userId , admin} = req 
  if (admin) return res.status(401).send("Unauthorized Action")
  
  let reservationNum 
   while (true){
    reservationNum = Math.floor((Math.random()*1000000)+90000000)
    const exist = await reservation.findOne({"reservationNumber": reservationNum})
    if (!exist)
      break;
  }
  req.body.reservationNumber = reservationNum + '' 
  req.body.user = userId

  let ticketNum 
   while (true){
    ticketNum = Math.floor((Math.random()*1000000)+90000000)
    const exist = await reservation.findOne({$or:[{"departureTicket.ticketNumber": ticketNum},{"returnTicket.ticketNumber":ticketNum}]})
    if (!exist)
      break;
  }
  req.body.departureTicket.ticketNumber = ticketNum + '' 

   reservation.create(req.body)
    .then(reservation => res.json(reservationNum))
    .catch(err => res.status(400).json({ error: err }));
});

router.patch('/bookhalfreservation/',verify,async (req,res)=>{

  const {reservationNumber,departureTicket,returnTicket} = req.body 

  if (departureTicket){
    let ticketNum 
   while (true){
    ticketNum = Math.floor((Math.random()*1000000)+90000000)
    const exist = await reservation.findOne({$or:[{"departureTicket.ticketNumber": ticketNum},{"returnTicket.ticketNumber":ticketNum}]})
    if (!exist)
      break;
  }
  req.body.departureTicket.ticketNumber = ticketNum + '' 
  await reservation.updateOne({"reservationNumber":reservationNumber},{$set: { "departureTicket" : req.body.departureTicket , "departureFlight" : req.body.departureFlight}}  )
  }

  if (returnTicket){
    let ticketNum 
   while (true){
    ticketNum = Math.floor((Math.random()*1000000)+90000000)
    const exist = await reservation.findOne({$or:[{"departureTicket.ticketNumber": ticketNum},{"returnTicket.ticketNumber":ticketNum}]})
    if (!exist)
      break;
  }
  req.body.returnTicket.ticketNumber = ticketNum + '' 
  await reservation.updateOne({"reservationNumber":reservationNumber},{$set: { "returnTicket" : req.body.returnTicket , "returnFlight" : req.body.returnFlight}} )

  }
  res.json({});

});





router.patch('/cancelhalfreservation/:id',verify, async(req, res) => {
  const {reservationNumber,departureTicket,returnTicket} = req.body 

  if (departureTicket){
    await reservation.updateOne({"reservationNumber" :reservationNumber },{$set: { "departureFlight" : null , "departureTicket" : null}})
  }

  if (returnTicket){
    await reservation.updateOne({"reservationNumber" : reservationNumber},{$set: { "returnFlight" : null , "returnTicket" : null}})
  }

  if (departureTicket && returnTicket){
    await reservation.deleteOne({"reservationNumber" : reservationNumber})
  }

});

router.delete('/deletefullreservation/:id',verify, async (req, res) => {
  reservation.findByIdAndRemove(req.params.id, req.body)
    .then(ticket => res.json({ mgs: 'ticket entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a ticket' }));
});


// to be handled
router.delete('/reservationsdeleteforflight/',verify,async (req, res) => {
  const {userId , admin} = req 
  if (!admin)
  return res.status(401).send("Unauthorized Action")

  const {flight} = req.body

  departureFlights =  await reservation.find({"departureFlight" : flight})
  if (departureFlights){
    let emails = []
    for (var i = 0 ; i< departureFlights.length ; i++){
      t = departureFlights[i].departureTicket
      emails.push({email: departureFlights[i].email , ticketNumber: t.ticketNumber , price: t.totalPrice })
    }
    await reservation.updateMany({"departureFlight" : flight},{$set: { "departureFlight" : null , "departureTicket" : null}})
    // send emails
    res.json(emails)
  }

  returnFlights =  await reservation.find({"returnFlight" : flight})
  if (returnFlights){
    let emails = []
    for (var i = 0 ; i< returnFlights.length ; i++){
      t = returnflights[i].returnTicket
      emails.push({email: returnFlights[i].email , ticketNumber: t.ticketNumber , price: t.totalPrice })
    }
    await reservation.updateMany({"returnFlight" : flight},{$set: { "returnFlight" : null , "returnTicket" : null}})
    // send emails
    res.json(emails)
  }

  // delete empty reservations
  await reservation.deleteMany({ $and: [{"departureFlight": null}, {"returnFlight":null}] })

});

module.exports = router;