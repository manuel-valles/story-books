const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', 
	{scope: ['profile', 'email']}));

// Callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), (req, res)=>{
    // Successful authentication, redirect dashboard
    res.redirect('/dashboard');
});

// Route to verify if the user is authenticated and logged in 
router.get('/verify', (req, res)=>{
	if(req.user){
		console.log(req.user);
	} else{
		console.log('Not Auth');
	}
});

// LogOut Route
router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});

module.exports = router;