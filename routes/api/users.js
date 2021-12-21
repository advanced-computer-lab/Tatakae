// routes/api/users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../../middleware/verifyTokenUser');


//Token secret
const secret = process.env.TOKEN_SECRET;

// Load user model
const user = require('../../models/user');
// load reservation model
const reservation = require('../../models/reservation');


router.get('/usergetall', (req, res) => {
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ message: 'No users found.' }));
});


router.get('/userget/',verify,(req, res) => {
  const {userId , admin} = req 
  user.findById(userId)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ message: 'No user found.' }));
});

router.post('/usercreate/',(req, res) => {
  user.create(req.body)
    .then(user => res.json({ message: 'user added successfully.' }))
    .catch(err => res.status(400).json({ message: 'Unable to add this user.' }));
});

router.patch('/userupdate/', verify, async(req, res) => {
  const {userId , admin} = req 
  const signInUser = await user.findById(userId);
  let isPassword = false ;
  if (req.body.oldPassword){
  isPassword = await bcrypt.compare(req.body.oldPassword, signInUser.password);
  delete req.body.oldPassword ;
  }

  if (req.body.newPassword ){
  if (!isPassword) return res.status(400).json({ message: "Old password is wrong/missing." });
  const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
  req.body.password = encryptedPassword
  delete req.body.newPassword ;
  }
  try{
  await user.findByIdAndUpdate(userId, {"email":req.body.email})
  if (req.body.email)
  await reservation.updateMany({"user" : userId},{$set: { "email" : req.body.email }})
  } catch (error) {
    res.status(500).json({ message: "Email already exist." });
  }
  await user.findByIdAndUpdate(userId, req.body)
  const userIn = { 
    firstName: req.body.firstName ,
    lastName: req.body.lastName ,
    email: req.body.email,
    admin: false,
    passportNumber: req.body.passportNumber,
    homeAddress: req.body.homeAddress
  }
  res.status(200).json({userIn});

});

router.delete('/userdelete/:id', (req, res) => {
  user.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ message: 'user entry deleted successfully.' }))
    .catch(err => res.status(404).json({ error: 'No such a user.' }));
});

router.post("/login", async (req,res) => {
  const { email, password } = req.body;

  try {
    const signInUser = await user.findOne({ "email":email });
    if (!signInUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPassword = await bcrypt.compare(password, signInUser.password);
    if (!isPassword) return res.status(400).json({ message: "Wrong Password." });

    const token = jwt.sign({ id: signInUser._id , admin: signInUser.administrator }, secret, { expiresIn: "2h" });
    const userIn ={ 
      firstName: signInUser.firstName ,
      lastName: signInUser.lastName ,
      email: signInUser.email,
      admin: signInUser.administrator,
      passportNumber: signInUser.passportNumber,
      homeAddress: signInUser.homeAddress
    }
    res.status(200).json({ userIn, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/signUp/", async (req,res) => { 
  const {firstName, lastName , password, administrator, homeAddress,countryCode,telephoneNumber,email,passportNumber } = req.body;
  try {
    const signUpUser = await user.findOne({ "email":email });
    if (signUpUser) return res.status(400).json({ message: "User already exists." });

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({ firstName: firstName ,lastName: lastName,email: email, password: encryptedPassword,administrator:administrator,homeAddress:homeAddress,countryCode:countryCode,telephoneNumber:telephoneNumber,passportNumber:passportNumber });

    const token = jwt.sign( {id: newUser._id , admin:newUser.administrator }, secret, { expiresIn: "1h" } );
    const userIn ={ firstName: newUser.firstName ,
      lastName: newUser.lastName ,
      email: newUser.email,
      admin: newUser.administrator
    }
    res.status(201).json({ userIn, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    
    console.log(error);
  }


});


router.delete('/logout', (req, res) => {

  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  // res.sendStatus(204)
})


module.exports = router;