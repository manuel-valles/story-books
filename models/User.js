const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const UserSchema =  new Schema({
	googleID:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	firstname:{
		type: String
	},
	lasttname:{
		type: String
	},
	image:{
		type: String
	}
});


// Create collection and add Schema
mongoose.model('users', UserSchema);