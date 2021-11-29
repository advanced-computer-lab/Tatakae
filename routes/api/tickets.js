// routes/api/tickets.js

const express = require('express');
const router = express.Router();
const verify = require('../../middleware/verifyTokenUser')

// Load ticket model
const ticket = require('../../models/ticket');


router.get('/ticketgetall', (req, res) => {
  ticket.find()
    .then(tickets => res.json(tickets))
    .catch(err => res.status(404).json({ noticketsfound: 'No tickets found' }));
});


router.get('/ticketget/:id', (req, res) => {
  ticket.findById(req.params.id)
    .then(ticket => res.json(ticket))
    .catch(err => res.status(404).json({ noticketfound: 'No ticket found' }));
});

router.get('/getUserTickets/',verify, (req, res) => {

  const {userId , admin} = req 
  if (admin) return res.status(401).send("Unauthorized Action")

  ticket.find({user : userId})
    .then(ticket => res.json(ticket))
    .catch(err => res.status(404).json({ noticketfound: 'No ticket found' }));
});



router.post('/ticketcreate/',verify,async (req, res) => {

  const {userId , admin} = req 
  if (admin) return res.status(401).send("Unauthorized Action")

  const {economyPrice,businessPrice,firstPrice,economySeats,businessSeats,firstSeats} = req.body;
  const totalPrice = economyPrice*economySeats.length + businessPrice*businessSeats.length + firstPrice*firstSeats.length
  let ticketNum 
   while (true){
    ticketNum = Math.floor((Math.random()*1000000)+90000000)
    const exist = await ticket.findOne({"ticketNumber": ticketNum})
    if (!exist)
      break;
  }
  req.body.ticketNumber = ticketNum + '' 
  req.body.totalPrice = totalPrice 
  req.body.user = userId
  await ticket.create(req.body)
    .then(ticket => res.json({ msg: 'ticket added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});


router.patch('/ticketupdate/:id', (req, res) => {
  const ticket =  ticket.findByIdAndUpdate(req.params.id, req.body)
     .then(ticket => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

router.delete('/deleteticketforuser/:id', (req, res) => {
  ticket.findByIdAndRemove(req.params.id, req.body)
    .then(ticket => res.json({ mgs: 'ticket entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a ticket' }));
});

router.delete('/ticketsdeleteforflight/',verify,async (req, res) => {
  const {userId , admin} = req 
  if (!admin)
  return res.status(401).send("Unauthorized Action")

  const {flight} = req.body
  const tickets = await ticket.find({"flight" : flight})

    if (tickets){
    let emails = [];
    for (var i = 0 ; i< tickets.length ; i++){
      t = tickets[i];
      emails.push({email: t.email , ticketNumber: t.ticketNumber , price: t.totalPrice })
    }
    await ticket.deleteMany({"flight" : flight})   
     // send emails
     res.json(emails)
  }
  else {
    res.json([])
  }
});

module.exports = router;