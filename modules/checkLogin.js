//  Authentication  Middleware

function isLoggedIn(req, res, next){
	req.session.returnTo = req.originalUrl
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'Please log in first')
	res.redirect('/login')
}

module.exports = isLoggedIn