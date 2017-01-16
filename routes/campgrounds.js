//=====================
// Campground Routes
//=====================

// Setting up router
var express = require('express'),
	router  = express.Router(),
	User = require('../models/user'),
	Campground = require('../models/campground'),
	isLoggedIn = require('../modules/checkLogin'),
	isAuthorized = require('../modules/authorizeCampground')

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
router.post('/', isLoggedIn, function (req, res) {
	var camp = req.body.camp
	var image = req.body.image
	var description = req.body.description
	var newCampground = {name: camp, image: image, description: description}
	newCampground.author = {
		username: req.user.username,
		id: req.user._id
	}
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
router.get('/new', isLoggedIn, function (req, res) {
	res.render('campgrounds/new.ejs', {title: 'Submit Campground'})
})

// Show route
router.get('/:id', function (req, res) {
	// Find campground and populate the comments from the DB
	Campground.findById(req.params.id).populate('comments').exec(function (error, foundCampground) {
		if (error) {
			console.log(error)
		}
		User.findById(foundCampground.author.id, function (error, author) {
			if(error){
				console.log(error)
			}
			res.render('campgrounds/show', {title: foundCampground.name, campground: foundCampground, author: author})
		})
	})
})

// Edit Route
router.get('/:id/edit', isLoggedIn, isAuthorized, function (req, res) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			console.log(error)
			res.redirect('back')
		}
			res.render('campgrounds/edit', {title: 'Edit Campground', campground: foundCampground})
	})
})

// Update Route
router.put('/:id', isAuthorized, function (req, res) {
	// Find and update campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (error) {
		if(error){
			console.log(error)
			res.redirect('/campgrounds')
		}
		res.redirect('/campgrounds/' + req.params.id)
	})
})

// Delete Request
router.delete('/:id', isLoggedIn, isAuthorized, function (req, res) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			console.log(error)
			res.redirect('back')
		}
		if(!foundCampground){
			console.log('No campground found')
			res.redirect(back)
		}
		if(foundCampground.author.id.equals(req.user.id)) {
			foundCampground.remove()
			res.redirect('/campgrounds')
		}
		else{
			res.redirect('/campgrounds')
		}
	})
})


module.exports = router