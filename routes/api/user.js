// routes/api/users.js

const express = require('express');
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Token secret
const secret = process.env.TOKEN_SECRET;

// Load user model
const user = require('../../models/user');


router.get('/usergetall', (req, res) => {
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});


router.get('/userget/:id', (req, res) => {
  user.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
});

router.post('/usercreate/', (req, res) => {
  user.create(req.body)
    .then(user => res.json({ msg: 'user added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

router.patch('/userupdate/:id', (req, res) => {
  const user =  user.findByIdAndUpdate(req.params.id, req.body)
     .then(user => res.json({ msg: 'Updated successfully' }))
     .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
     );
});

router.delete('/userdelete/:id', (req, res) => {
  user.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'user entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

router.post("/login", (req,res) => {
  const { email, password } = req.body;

  try {
    const signInUser = await user.findOne({ email });
    if (!signInUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPassword = await bcrypt.compare(password, signInUser.password);
    if (!isPassword) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign({ id: signInUser._id , admin: signInUser.administrator }, secret, { expiresIn: "2h" });

    res.status(200).json({ result: signInUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/signup", (req,res) => { 
  const {firstName, lastName , password, administrator, homeAddress,countryCode,telephoneNumber,email,passportNumber } = req.body;
  try {
    const signUpUser = await user.findOne({ email });
    if (signUpUser) return res.status(400).json({ message: "User already exists" });

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ firstName: firstName ,lastName: lastName,email: email, password: encryptedPassword,administrator:administrator,homeAddress:homeAddress,countryCode:countryCode,telephoneNumber:telephoneNumber,passportNumber:passportNumber });

    const token = jwt.sign( {id: newUser._id , admin:newUser.administrator }, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }


});


module.exports = router;