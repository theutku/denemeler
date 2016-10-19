exports.index = function(req, res) {
    res.render('index', {
        title: 'Welcome'
    });
};

exports.badRoute = function(req, res) {
    res.render('error', {
        title: 'Bad Route!'
    });
};