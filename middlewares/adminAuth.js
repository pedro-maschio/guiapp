function adminAuth(req, res, next) {
    if(req.session.user != undefined) // the user is logged in
        next();
    else 
        res.redirect('/login');
}

module.exports = adminAuth;