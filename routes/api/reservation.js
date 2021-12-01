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

router.get('/getUserReservations/',verify, (req, res) => {

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
  await reservation.create(req.body)
    .then(reservation => res.json({ msg: 'reservation added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});


router.patch('/reservationupdate/:id', (req, res) => {
  const reservation =  reservation.findByIdAndUpdate(req.params.id, req.body)
     .then(reservation => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

router.delete('/deletereservationforuser/:id', (req, res) => {
  reservation.findByIdAndRemove(req.params.id, req.body)
    .then(reservation => res.json({ mgs: 'reservation entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a reservation' }));
});


// to be handled
router.delete('/reservationsdeleteforflight/',verify,async (req, res) => {
  const {userId , admin} = req 
  if (!admin)
  return res.status(401).send("Unauthorized Action")

  const {departureflight,returnflight} = req.body
  const reservations = await reservation.find({"flight" : flight})

    if (reservations){
    let emails = [];
    for (var i = 0 ; i< reservations.length ; i++){
      t = reservations[i];
      emails.push({email: t.email , reservationNumber: t.reservationNumber , price: t.totalPrice })
    }
    await reservation.deleteMany({"flight" : flight})   
     // send emails
     res.json(emails)
  }
  else {
    res.json([])
  }
});

module.exports = router;