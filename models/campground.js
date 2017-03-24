// Campground Schema
var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	// Storing the user who created the campground
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// Export the campgroundSchema as a model
module.exports = mongoose.model("Campground", campgroundSchema);