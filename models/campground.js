// Campground Schema
var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	// Storing the user who created the campground
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	// Storing association on the campground will be refactored to normal db relationship later
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});
// Export the campgroundSchema as a model
module.exports = mongoose.model("Campground", campgroundSchema);