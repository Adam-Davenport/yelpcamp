//         ROUTES

// Setting up router
var express = require('express'),
		router  = express.Router(),
		passport = require('passport'),
		User     = require('../models/user')

// Root Route
router.get('/', function (req, res) {
	// res.render('landing', {title: 'YelpCamp'})
	// Redirecting to campgrounds page until the landing page is complete
	res.redirect('/campgrounds')
})

//========================
// Authentication Routes
//========================

// Show register form
router.get('/register', function(req,res){
	res.render('register', {title: 'Register'})
})

// Handle Signup logic
router.post('/register', function(req, res){
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName
	})
	User.register(newUser, req.body.password, function(error){
		if(error){
			req.flash('error', error.message)
			res.redirect('/register')
		}
		else{
			passport.authenticate('local')(req,res, function (){
				req.flash('success', 'Successfully signed up!')
				res.redirect('/campgrounds')
			})
		}
	})
})

// Show login form
router.get('/login', function(req, res){
	res.render('login', {title: 'Login'})
})

// Handle login into the site
router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), function(req, res) {
	req.flash('success', 'Successfully signed in.')
	if(req.session.returnTo){
		var destination = req.session.returnTo
		delete req.session.returnTo
		res.redirect(destination)
	}
	else{
		res.redirect('/');
	}
})

// Handle login out of the site
router.get('/logout', function (req, res){
	req.logout()
	req.flash('success', 'Logged you out')
	res.redirect('/')
})



module.exports = router