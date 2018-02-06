const express = require('express');
const router = express.Router();

// Index Route - Get request
router.get('/', (req, res)=>{
	res.render('index/welcome');
});

// Dashboard Route
router.get('/dashboard', (req, res)=>{
	res.render('index/dashboard');
});


module.exports = router;
