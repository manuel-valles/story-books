// Import main modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');


// Load User Model
require('./models/User');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// Map global promises
// mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Initialize the application
const app = express();

// Index Route - Get request
app.get('/', (req, res)=>{
	res.send('Testing Heroku');
});

// Port Varibale
const port = process.env.PORT || 5000;

// Use Routes
app.use('/auth', auth);

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});