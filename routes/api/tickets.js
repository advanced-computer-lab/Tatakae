// routes/api/tickets.js

const express = require('express');
const router = express.Router();

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


router.post('/ticketcreate/', async (req, res) => {

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


router.delete('/ticketdelete/:id', (req, res) => {
  ticket.findByIdAndRemove(req.params.id, req.body)
    .then(ticket => res.json({ mgs: 'ticket entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a ticket' }));
});

module.exports = router;