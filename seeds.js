// Required modules
// var mongoose = require("mongoose");

//Required models
var Campground = require("./models/campground");
var Comment = require("./models/comment");

// Sample data for campgrounds
var data = [
	{
	name: "Willow Woods",
	image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
	description: "Test camp description"
	},
	{
	name: "Bronze Beach",
	image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
	description: "Test camp description"
	},
	{
	name: "Endor",
	image: "https://farm9.staticflickr.com/8457/7930235502_df747573ca.jpg",
	description: "Test camp description"
	}
];
//Function to populate the database
function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function (error) {
		if(error){
			console.log(error);
		}
		console.log("Removed campgrounds");
		// Adding some campgrounds
		data.forEach( function(seed) {
			Campground.create(seed, function (error, campground) {
				if(error){
					console.log(error);
				}
				else{
					console.log("Adding Campgrounds");
					// Creating a comment
					Comment.create({
						text: "Cool place, really chill.",
						author: "Carlton Banks"
					},
					function (error, comment) {
						if(error){
							console.log(error);
						}
						else{
							campground.comments.push(comment);
							campground.save();
							console.log("Adding comments");
						}
					});
				}
			})	
		});	
	})
}

module.exports = seedDB;