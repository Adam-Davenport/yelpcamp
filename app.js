// Initial required modules
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment')
	seedDB = require('./seeds')

// Connect to database
mongoose.connect('mongodb://localhost/yelp_camp')

// Use body-parser middleware for getting information from post and put requests
app.use(bodyParser.urlencoded({extended: true}))

// Serve static files from the public folder
app.use('/public', express.static(__dirname + '/public'))

// Run the seed DB to remove and repopulate the database
seedDB()
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	res.render('landing', {title: 'YelpCamp'})
})

// Finding a campground
function findCampground(id) {
	return Campground.findById(id, findItem)
}

// Can be used with any mongoose search
function findItem(error, item) {
	if (error) {
		console.log(error)
		return null
	}
	else {
		return item
	}
}

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
app.get('/campgrounds/:id/comments/new', function (req, res) {
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
app.post('/campgrounds/:id/comments', function (req, res) {
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
//=================================================

// Set the app to listen on port 3000
app.listen(3000, function () {
	console.log('The yelpcamp server has started.')
})