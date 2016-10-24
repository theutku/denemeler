//Require Needed Modules =======================

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Define the Schema for User Model =============

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

//METHODS ==========================================
//Generate Hash ==================================

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Check if Password is Valid =========================

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

//Export Module =======================================

module.exports = mongoose.model('User', userSchema);