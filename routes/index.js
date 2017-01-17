//=========================
//         ROUTES
//=========================

// Setting up router
var express = require('express'),
		router  = express.Router(),
		passport = require('passport'),
		User     = require('../models/user')

// Root Route
router.get('/', function (req, res) {
	res.render('landing', {title: 'YelpCamp'})
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
	console.log('here')
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName
	})
	User.register(newUser, req.body.password, function(error){
		if(error){
			console.log(error)
			return res.redirect('/register')
		}
		passport.authenticate('local')(req,res, function (){
			res.redirect('/campgrounds')
		})
	})
})

// Show login form
router.get('/login', function(req, res){
	res.render('login', {title: 'Login'})
})

// Handle loggin into the site
router.post('/login', passport.authenticate('local',
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}
))

// Handle login out of the site
router.get('/logout', function (req, res){
	req.logout()
	res.redirect('/')
})



module.exports = router