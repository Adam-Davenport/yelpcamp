var mongoose = require('mongoose'),
		plm = require('passport-local-mongoose'),
//  Define the User Schema
	userSchema = new mongoose.Schema({
		username: String,
		password: String,
		firstName: String,
		lastName: String
	})

// Plug in passport local mongoose to the user schema
userSchema.plugin(plm)

// Export the model
module.exports = mongoose.model('User', userSchema)