// Authorization Middleware

var	Campground = require('../models/campground')

function authorize(req, res , next) {
	Campground.findById(req.params.id, function (error, foundCampground) {
		if(error){
			req.flash('error', error.message)
			res.redirect('back')
		}
		else{
			if(req.user._id.equals(foundCampground.author.id)){
				return next()
			}
			else{
				req.flash('error', 'You are not authorized to do that operation.')
				res.redirect('back')
			}
		}
	})
}

module.exports = authorize