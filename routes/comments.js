//   Campground comment routes

// Setting up router
var express = require('express'),
		router  = express.Router({mergeParams: true}),
		Comment    = require('../models/comment'),
		Campground = require('../models/campground'),
		isLoggedIn = require('../modules/checkLogin'),
		isAuthorized = require('../modules/authorizeComment')

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

// Root redirection
router.get('/', function (req, res) {
	res.redirect('/campgrounds/' + req.params.id)
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
					// Add username and id to the comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					// Save comment
					comment.save()
					// Adding the comment
					campground.comments.push(comment)
					console.log(campground.comments)
					//Update score of campground
					var score = 0
					campground.comments.forEach(function (comment) {
						score += parseInt(comment.score)
						console.log(score)
						console.log(comment)
						console.log(campground.comments.length)
					})
					if(campground.comments.length > 0)
					{
						campground.score = parseInt(score)
					}
					else{
						campground.score = 0
					}
					campground.save()
					res.redirect('/campgrounds/' + campground._id)
				}
			})
		}
	})
})

// Edit
router.get('/:comment/edit', isLoggedIn, isAuthorized, function(req, res){
	Comment.findById(req.params.comment, function(error, foundComment){
		if(error){
			console.log(error)
			res.redirect('back')
		}
		if(!foundComment){
			console.log('No comment found')
			res.redirect('back')
		}
		else{
			res.render('comments/edit',
			{
				title: 'Edit Comment',
				comment: foundComment,
				url: '/campgrounds/'+ req.params.id + '/comments/' + foundComment._id
			})
		}
	})
})

// Update
router.put('/:comment', isLoggedIn, isAuthorized, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment, req.body.comment, function (error) {
		if(error){
			console.log('error')
		}
			res.redirect('/campgrounds/'+ req.params.id)
	})
})

// Delete
router.delete('/:comment', isLoggedIn, isAuthorized, function (req, res) {
	Comment.findByIdAndRemove(req.params.comment, function (error) {
		if(error){
			console.log('error')
		}
		res.redirect('/campgrounds/' + req.params.id)
	})
})

module.exports = router