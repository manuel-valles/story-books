const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

module.exports = (passport)=>{
	// Define the strategy
	passport.use(
		new GoogleStrategy({
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: 'auth/google/callback',
			// Heroky will try https, so we need the proxy
			proxy: true
		}, (accessToken, refreshToken, profile, done)=>{
			console.log(accessToken);
			console.log(profile);
		})
	)
}