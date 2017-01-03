var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files from the public folder
app.use('/public', express.static(__dirname + '/public'));

// Run the seed DB to remove and repopulate the database
seedDB();
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("landing", {title:"YelpCamp"});
});

// Campground Routes
app.get("/campgrounds", function (req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function (error, campgrounds) {
		if(error){
			console.log(error);
		}
		else{
			res.render("index", {title:"Campgrounds", campgrounds:campgrounds});
		}
		});
});

app.post("/campgrounds", function (req, res) {
	var camp = req.body.camp;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name:camp, image:image, description:description};
	// Create a new campground and save to DB
	Campground.create(newCampground, function (error) {
		if(error){
			console.log(error);
		}
		else{
			res.redirect('/campgrounds');
		}
	});
});

app.get("/campgrounds/new", function (req, res) {
	res.render("new.ejs", {title:"Submit Campground"});
});

// Show route for campground must be declared after new or other routes directly under /campgrouds
app.get("/campgrounds/:id", function (req ,res) {
	Campground.findById(req.params.id).populate("comments").exec(function (error, foundCampground) {
		if(error){
			console.log(error);
		}
		else{
			console.log(foundCampground);
			res.render("show", {title: foundCampground.name, campground: foundCampground});
		}
	});
});
//********************************************************************************************

//Camground comment routes
app.get("/campgrounds/:id/comments/new", function(req, res){
	res.render("comments/new");
})

app.listen(3000, function () {
	console.log("The yelpcamp server has started.");
});