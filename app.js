// Import main modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/User');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const stories = require('./routes/stories');
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

// Handlebars Middleware
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/stories', stories);
app.use('/auth', auth);

// Port Varibale
const port = process.env.PORT || 5000;


// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});