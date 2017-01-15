//======================================
//   Campground comment routes
//======================================

// Setting up router
var express = require('express'),
		router  = express.Router({mergeParams: true}),
		Campground = require('../models/campground'),
		Comment    = require('../models/comment'),
		isLoggedIn = require('../modules/checkLogin')

// New route
router.get('/new', isLoggedIn, function (req, res) {
	// Find campground by the id
	Campground.findById(req.params.id, function (error, campground) {
		if (error) {
			console.log(error)
			res.redirect('/campgrounds')
		}
		else {
			res.render('comments/new', {title: 'Comment', id: req.params.id, campground: campground})
		}
	})
})

// Create route
router.post('/', isLoggedIn, function (req, res) {
	// Find the campground by ID
	Campground.findById(req.params.id, function (error, campground) {
		if (error) {
			console.log(error)
			res.redirect('/campgrounds')
		}
		else {
			Comment.create(req.body.comment, function(error, comment){
				if(error){
					console.log(error)
				}
				else{
					campground.comments.push(comment)
					campground.save()
					res.redirect('/campgrounds/' + campground._id)
				}
			})
		}
	})
})

module.exports = router