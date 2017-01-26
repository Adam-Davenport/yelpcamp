// Authorize Comment
var Comment = require('../models/comment')

function authorize(req, res, next){
	Comment.findById(req.params.comment, function (error, foundComment) {
		if(error){
			req.flash('error', error.message)
			res.redirect('back')
		}
		else if(!foundComment){
			req.flash('error', 'Unable to find comment')
			res.redirect('back')
		}
		else if(req.user._id.equals(foundComment.author.id)){
			next()
		}
		else{
			req.flash('error', 'You are not authorized to do that operation')
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
}

module.exports = authorize