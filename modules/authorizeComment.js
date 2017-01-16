// Authorize Comment
var Comment = require('../models/comment')

function authorize(req, res, next){
	Comment.findById(req.params.comment, function (error, foundComment) {
		if(error){
			res.redirect('back')
		}
		else{
			console.log(foundComment)
			if(req.user._id.equals(foundComment.author.id)){
				next()
			}
			else{
				res.redirect('back')
			}
		}
	})
}

module.exports = authorize