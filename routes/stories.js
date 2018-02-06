const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index Route
router.get('/', (req, res)=>{
	res.render('stories/index');
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res)=>{
	res.render('stories/add');
});

module.exports = router;