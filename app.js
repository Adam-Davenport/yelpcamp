var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files from the public folder
app.use('/public', express.static(__dirname + '/public'));
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create({name: "Boulder Creek", image: "https://fs.usda.gov/Internet/FSE_MEDIA/stelprdb5270335.jpg"},
	function (err, campground) {
		if(err){
			console.log(err);
		}
		else {
			console.log('Created new campgorund!');
			console.log(campground);
		}
	});

var campgrounds = 
	[
		{name: "Boulder Creek", image: "https://fs.usda.gov/Internet/FSE_MEDIA/stelprdb5270335.jpg"},
		{name: "Brown County", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg" },
		{name: "Villa Falls", image: "http://usaywhat.com/wp-content/uploads/2015/01/greatlang1.jpg"},
		{name: "Willis Wilds", image: "http://pioneercampground.com/site/wp-content/uploads/2015/02/campsite57_1.jpg"}
	];
*/
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("landing", {title:"YelpCamp"});
});

app.get("/campgrounds", function (req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function (error, campgrounds) {
		if(error){
			console.log(error);
		}
		else{
			res.render("campgrounds", {title:"Campgrounds", campgrounds:campgrounds});
		}
		});
});

app.post("/campgrounds", function (req, res) {
	var camp = req.body.camp;
	var image = req.body.image;
	var newCampground = {name:camp, image:image};
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

app.listen(3000, function () {
	console.log("The yelpcamp server has started.");
});