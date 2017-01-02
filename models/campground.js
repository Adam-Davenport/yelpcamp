// Campground Schema
var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
// Export the campgroundSchema as a model
module.exports = mongoose.model("Campground", campgroundSchema);