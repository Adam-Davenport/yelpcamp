// Initial required modules
var express = require('express'),
	app           = express(),
	seedDB        = require('./seeds'),
	passport      = require('passport'),
	mongoose      = require('mongoose'),
	bodyParser    = require('body-parser'),
	User          = require('./models/user'),
	LocalStrategy = require('passport-local'),
	Comment       = require('./models/comment'),
	Campground    = require('./models/campground')

//=======================
// Database Config
//=======================

// Connect to database
mongoose.connect('mongodb://localhost/yelp_camp')

// Run the seed DB to remove and repopulate the database
seedDB()

// Use body-parser middleware for getting information from post and put requests
app.use(bodyParser.urlencoded({extended: true}))

// Serve static files from the public folder
app.use('/public', express.static(__dirname + '/public'))

// Set the templating engine to EJS
app.set('view engine', 'ejs')

// Passport Configuration
app.use(require('express-session')({
	secret: "This is a message for authentication of the system",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Make req.user available to all routes must be declared after passport
app.use(function(req, res, next){
	res.locals.user = req.user
	next()
})

//=========================
//         ROUTES
//=========================

// Root Route
app.get('/', function (req, res) {
	res.render('landing', {title: 'YelpCamp'})
})

//=====================
// Campground Routes
//=====================

// Index Route
app.get('/campgrounds', function (req, res) {
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
app.post('/campgrounds', function (req, res) {
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
app.get('/campgrounds/new', function (req, res) {
	res.render('campgrounds/new.ejs', {title: 'Submit Campground'})
})

// Show route for campground must be declared after new or other routes directly under campgrounds directory
app.get('/campgrounds/:id', function (req, res) {
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
//=================================================

//======================================
//   Camground comment routes
//======================================
// New route
app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
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
app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
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

//========================
// Authentication Routes
//========================

// Show register form
app.get('/register', function(req,res){
	res.render('register', {title: 'Register'})
})

// Handle Signup logic
app.post('/register', function(req, res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(error, user){
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
app.get('/login', function(req, res){
	res.render('login', {title: 'Login'})
})

// Handle loggin into the site
app.post('/login', passport.authenticate('local',
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}
))

// Handle login out of the site
app.get('/logout', function (req, res){
	req.logout()
	res.redirect('/')
})

//=========================
//    Middleware
//=========================

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect('/login')
}

//=================================================

// Set the app to listen on port 3000
app.listen(3000, function () {
	console.log('The yelpcamp server has started.')
})