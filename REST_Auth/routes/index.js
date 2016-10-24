module.exports = function(app, passport) {

    //Home Page =================================
    app.get('/', function(req, res) {
        res.render('index');
    });

    //Login Page ================================
    app.get('/login', function(req, res) {
        res.render('login', { 
            message: req.flash('loginMessage') 
        });
    });

    //Signup Page ==============================
    app.get('/signup', function(req, res) {
        res.render('signup', { 
            message: req.flash('signupMessage') 
        });
    });

    //Profile Page =======================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        });
    });

    //Logout =============================================
    app.get('/logout', function(req, res) {
        res.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/');
    }
}