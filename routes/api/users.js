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


router.get('/usergetall', (req, res) => {
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});


router.get('/userget/',verify,(req, res) => {
  const {userId , admin} = req 
  user.findById(userId)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found' }));
});

router.post('/usercreate/',(req, res) => {
  user.create(req.body)
    .then(user => res.json({ msg: 'user added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

router.patch('/userupdate/', verify, async(req, res) => {
  const {userId , admin} = req 
  if (req.body.password){
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = encryptedPassword
  }
  try{
  await user.findByIdAndUpdate(userId, req.body)
  const userIn ={ 
    firstName: req.body.firstName ,
    lastName: req.body.lastName ,
    email: req.body.email,
    admin: false,
    passportNumber: req.body.passportNumber,
    homeAddress: req.body.homeAddress
  }
  res.status(200).json({userIn});

  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }


});

router.delete('/userdelete/:id', (req, res) => {
  user.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ mgs: 'user entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a user' }));
});

router.post("/login", async (req,res) => {
  const { email, password } = req.body;

  try {
    const signInUser = await user.findOne({ "email":email });
    if (!signInUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPassword = await bcrypt.compare(password, signInUser.password);
    if (!isPassword) return res.status(400).json({ message: "Wrong Password" });

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
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/signUp/", async (req,res) => { 
  const {firstName, lastName , password, administrator, homeAddress,countryCode,telephoneNumber,email,passportNumber } = req.body;
  try {
    const signUpUser = await user.findOne({ "email":email });
    if (signUpUser) return res.status(400).json({ message: "User already exists" });

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
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }


});


router.delete('/logout', (req, res) => {

  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  // res.sendStatus(204)
})


module.exports = router;