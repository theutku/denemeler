//Require Modules ====================================

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema ========================================

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//Create User and Pass Hash ==========================

User.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

//PASSPORT ===========================================
//Find User by Name ==================================

User.getUserByUsername = function(username, callback) {
    var query = {username: username};
    User.findOne(query, callback);
}

//Compare Passwords ==================================

User.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) {
            console.log(err);
            throw err;
        } else {
            callback(null, isMatch);
        }
    });
}

//Find User by ID ====================================

User.getUserById = function(id, callback) {
    User.findById(id, callback);
}