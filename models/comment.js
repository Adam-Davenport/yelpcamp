// Comment Schema
var mongoose = require("mongoose");
// Create the schema for the comment
var commentSchema = new mongoose.Schema({
	text: String,
	author: String
});
// Export the schema as a model
module.exports = mongoose.model("Comment", commentSchema);