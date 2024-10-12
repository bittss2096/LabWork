const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',authController.registerUser);

router.get('/login',passport.authenticate('local'),(req,res)=>{
    res.send('Logged in succesfully');
})

//Route to logout

module.exports = router;