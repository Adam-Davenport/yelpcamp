var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = 
	[
		{name: "Boulder Creek", image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg"},
		{name: "Brown County", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg" }
	];

app.set("view engine", "ejs");

app.get("/", function (req, res) {
	res.render("landing", {title:"YelpCamp"});
})

app.get("/campgrounds", function (req, res) {
	res.render("campgrounds", {title:"Campgrounds", campgrounds:campgrounds})
})

app.post("/campgrounds", function (req, res) {
	var camp = req.body.camp;
	var image = req.body.image;
	var newCampground = {name:camp, image:image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function (req, res) {
	res.render("new.ejs", {title:"Submit Campground"});
})

app.listen(3000, function () {
	console.log("The yelpcamp server has started.");
});