// Authorization Middleware

var	Campground = require('../models/campground')

function authorize(req, res , next) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			res.redirect('back')
		}
		else{
			if(req.user._id.equals(foundCampground.author.id)){
				next()
			}
			else{
				res.redirect('back')
			}
		}
	})
}

module.exports = authorize