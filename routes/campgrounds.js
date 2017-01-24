// Campground Routes

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
			req.flash('error', error.message)
			res.redirect('/')
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
			req.flash('error', error.message)
			res.redirect('/campgrounds')
		}
		else {
			req.flash('success', 'Successfully created campground')
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
			req.flash('error', 'Unable to find campground.')
			res.redirect('/campgrounds')
		}
		else if(!foundCampground){
			req.flash('error', 'Unable to find campground')
			res.redirect('/campgrounds')
		}
		else{
			User.findById(foundCampground.author.id, function (error, author) {
				res.render('campgrounds/show', {title: foundCampground.name, campground: foundCampground, author: author})
			})
		}
	})
})

// Edit Route
router.get('/:id/edit', isLoggedIn, isAuthorized, function (req, res) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			console.log(error)
			req.flash('error', error.message)
			res.redirect('/campgrounds')
		}
		else if(!foundCampground){
			req.flash('error', 'Unable to find campground')
			res.redirect('/campgrounds')
		}
		else{
			res.render('campgrounds/edit', {title: 'Edit Campground', campground: foundCampground})
		}
	})
})

// Update Route
router.put('/:id', isAuthorized, function (req, res) {
	// Find and update campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (error, updatedCampground) {
		if(error){
			req.flash('error', 'Unable to find campground')
			res.redirect('/campgrounds')
		}
		else if(!updatedCampground){
			req.flash('error', 'Unable to find campground')
			res.redirect('/campgrounds')
		}
		else{
			req.flash('success', 'Successfully updated campground.')
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

// Delete Request
router.delete('/:id', isLoggedIn, isAuthorized, function (req, res) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			console.log(error)
			req.flash('error', error.message)
			res.redirect('back')
		}
		else if(!foundCampground){
			req.flash('error', 'Unable to find campground.')
			res.redirect(back)
		}
		else if(foundCampground.author.id.equals(req.user.id)) {
			foundCampground.remove()
			req.flash('success', 'Successfully deleted campground.')
			res.redirect('/campgrounds')
		}
		else{
			req.flash('error', 'You are not authorized to do that.')
			res.redirect('/campgrounds')
		}
	})
})


module.exports = router