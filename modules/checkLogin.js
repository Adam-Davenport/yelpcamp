//  Authentication  Middleware

function isLoggedIn(req, res, next){
	req.session.returnTo = req.originalUrl
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'Please log in or sign up first.')
	res.redirect('/login')
}

module.exports = isLoggedIn