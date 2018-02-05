// Import main modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

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

// Session Middleware
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}))
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next)=>{
	res.locals.user = req.user || null;
	next();
});

// Use Routes
app.use('/auth', auth);

// Port Varibale
const port = process.env.PORT || 5000;


// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});