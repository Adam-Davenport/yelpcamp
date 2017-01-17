// Initial required modules
var express = require('express'),
	app           = express(),
	// seedDB        = require('./seeds'),
	passport      = require('passport'),
	mongoose      = require('mongoose'),
	bodyParser    = require('body-parser'),
	User          = require('./models/user'),
	LocalStrategy = require('passport-local'),
	methodOver    = require('method-override')


//=======================
// Database Config
//=======================

// Connect to database
mongoose.connect('mongodb://adam:secretPassword@10.0.0.3/yelp_camp')

// Run the seed DB to remove and repopulate the database
// seedDB()

// Use body-parser middleware for getting information from post and put requests
app.use(bodyParser.urlencoded({extended: true}))

// Serve static files from the public folder
app.use('/public', express.static(__dirname + '/public'))

// Set the templating engine to EJS
app.set('view engine', 'ejs')

// Setup method override to look for _method
app.use(methodOver('_method'))

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

//=======================
//      Routes
//=======================

var campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes    = require('./routes/comments'),
	authRoutes       = require('./routes/index')

app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use(authRoutes)

// Set the app to listen on port 3000
app.listen(3000, function () {
	console.log('The yelpcamp server has started.')
})