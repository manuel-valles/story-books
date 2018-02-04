// Import main modules
const express = require('express');
const mongoose = require('mongoose');

// Initialize the application
const app = express();

// Index Route - Get request
app.get('/', (req, res)=>{
	res.send('Testing Heroku');
});

// Port Varibale
const port = process.env.PORT || 5000;

// Listen in certain port and a callback function
app.listen(port, ()=>{
	console.log(`Server started on port ${port}`);
});