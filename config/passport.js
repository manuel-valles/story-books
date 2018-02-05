const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');

// Load User Model
const User = mongoose.model('users');

module.exports = (passport)=>{
	// Define the strategy
	passport.use(
		new GoogleStrategy({
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			// Heroky will try https, so we need the proxy
			proxy: true
		}, (accessToken, refreshToken, profile, done)=>{
			// console.log(accessToken);
			// console.log(profile);
			const image = profile.photos[0].value.substring(0,  profile.photos[0].value.indexOf('?'));
			
			const newUser = {
				googleID: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				image: image
			}

			// Check for existing users
			User.findOne({
				googleID: profile.id
			}).then(user =>{
				if(user){
					// Return user
					done(null, user);
				} else{
					// Create User
					new User(newUser)
						.save()
						.then(user => done(null, user))
				}
			})
		})
	)
}