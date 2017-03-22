// Campground Schema
var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	score: Number,
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

// Calculate Scores
campgroundSchema.methods.calculateScores = function () {
	var score = 0
	this.comments.forEach(function (comment) {
		score += comment.score
	})
	this.score = score/(this.comments.length-1)
	this.save()
}

// Export the campgroundSchema as a model
module.exports = mongoose.model("Campground", campgroundSchema);