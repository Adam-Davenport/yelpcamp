// Comment Schema
var mongoose = require('mongoose')
// Create the schema for the comment
var commentSchema = new mongoose.Schema({
	text: String,
	score: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
})
// Export the schema as a model
module.exports = mongoose.model('Comment', commentSchema)