var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = 
	[
		{name: "Boulder Creek", image: "https://fs.usda.gov/Internet/FSE_MEDIA/stelprdb5270335.jpg"},
		{name: "Brown County", image: "http://cdn-jpg2.theactivetimes.net/sites/default/files/camping.jpg" },
		{name: "Villa Falls", image: "http://usaywhat.com/wp-content/uploads/2015/01/greatlang1.jpg"},
		{name: "Willis Wilds", image: "http://pioneercampground.com/site/wp-content/uploads/2015/02/campsite57_1.jpg"}
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