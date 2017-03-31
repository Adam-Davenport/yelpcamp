//  Authentication  Middleware

function isLoggedIn(req, res, next){
	req.session.returnTo = req.originalUrl
	if(req.isAuthenticated()){
		return next()
	}
	req.flash('error', 'Please log in or sign up first.')
	res.render('loginredirect.ejs', {title: 'Login or Sign Up'})
}

module.exports = isLoggedIn