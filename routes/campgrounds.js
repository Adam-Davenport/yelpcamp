//=====================
// Campground Routes
//=====================

// Setting up router
var express = require('express'),
	router  = express.Router(),
	Campground = require('../models/campground')

// Index Route
router.get('/', function (req, res) {
	// Get all campgrounds from DB
	Campground.find({}, function (error, campgrounds) {
		if (error) {
			console.log(error)
		}
		else {
			res.render('campgrounds/index', {title: 'Campgrounds', campgrounds: campgrounds})
		}
	})
})

// Create route
router.post('/', function (req, res) {
	var camp = req.body.camp
	var image = req.body.image
	var description = req.body.description
	var newCampground = {name: camp, image: image, description: description}
	// Create a new campground and save to DB
	Campground.create(newCampground, function (error) {
		if (error) {
			console.log(error)
		}
		else {
			res.redirect('/campgrounds')
		}
	})
})

// New Route
router.get('/new', function (req, res) {
	res.render('campgrounds/new.ejs', {title: 'Submit Campground'})
})

// Show route
router.get('/:id', function (req, res) {
	// Find campground and populate the comments from the DB
	Campground.findById(req.params.id).populate('comments').exec(function (error, foundCampground) {
		if (error) {
			console.log(error)
		}
		else {
			res.render('campgrounds/show', {title: foundCampground.name, campground: foundCampground})
		}
	})
})

module.exports = router