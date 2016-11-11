// Require and Set Modules =====================================

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var userModel = require('../models/user');
var contactModel = require('../models/contact');

var router = express.Router();

// GET Homepage ================================================

router.get('/', function(req, res) {
    res.render('index', {
        title: 'ContactsApp'
    });
});

// GET Register Page ===========================================

router.get('/users/register', isNotLoggedIn, function(req, res) {
    res.render('register', {
        title: 'Register',
        errors: []
    });
});

// GET Account Page ============================================

router.get('/users/account', isLoggedIn, function(req, res) {
    res.render('account', {
        title: 'Account',
    });
});

// GET Login Page ==============================================

router.get('/users/login', isNotLoggedIn, function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

// GET Contacts Page ===========================================

router.get('/users/contacts', isLoggedIn, function(req, res) {
    contactModel.listContacts(req.user.id, function(err, contactExist, results) {
        if(err) {
            req.flash('errorMsg', 'Error listing contacts.');
            res.render('contacts', {
                title: 'Error',
                contacts: [],
                errors: []
            });
        } else if(!contactExist) {
            req.flash('successMsg', 'No contacts found.');
            res.render('contacts', {
                title: 'Contacts',
                contacts: [],
                errors: []
            });
        } else {
            res.render('contacts', {
            title: 'Contacts',
            errors: [],
            contacts: results
            });
        }
    });

});

// POST Login Page =============================================

router.post('/users/login', passport.authenticate('local-login', {
    successRedirect: '/users/contacts',
    failureRedirect: '/users/login',
    failureFlash: true
}));

// GET Logout ==================================================

router.get('/users/logout', isLoggedIn, function(req, res) {
    req.logout();
    req.flash('successMsg', 'Logout successful.');
    res.redirect('/users/login');
});

// POST Register Page ==========================================

router.post('/users/register', isNotLoggedIn, function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    //Form Validation  =========================================
    req.checkBody('username', 'A valid username is necessary.').notEmpty();
    req.checkBody('email', 'A valid e - mail address is necessary.').notEmpty();
    req.checkBody('email', 'E - mail address is not valid.').isEmail();
    req.checkBody('password', 'A valid password is necessary.').notEmpty();
    req.checkBody('password2', 'Passwords do not match.').equals(password);

    var formErrors = req.validationErrors();

    if(formErrors) {
        console.log('Registration form not fulfilled.');
        res.render('register', {
            title: 'Register - Error',
            errors: formErrors
        });
    } else {
        var dateNow = new Date();

        var newUser = {
            username: username,
            email: email,
            password: password,
            date: dateNow
        }

        userModel.createUser(newUser, function(err, userExist, emailExist) {
            if(err) {
                console.log('Error creating new user.');
                req.flash('errorMsg', 'Error creating user.');
                res.redirect('/users/register');
            } else if(userExist) {
                req.flash('errorMsg', 'Username already taken.');
                res.redirect('/users/register');
            } else if(emailExist) {
                req.flash('errorMsg', 'E - mail address already taken.');
                res.redirect('/users/register');
            } else {
                req.flash('successMsg', 'Account created. Please login to continue.');
                res.redirect('/users/login');
            }
        });
    }
});

//DELETE User Account ==========================================

router.post('/users/delete', isLoggedIn, function(req, res) {
    userModel.deleteUser(req.user, function(err) {
        if(err) {
            req.flash('errorMsg', 'Error deleting account.');
            res.redirect('/users/login');
        } else {
            req.logout();
            req.flash('successMsg', 'Account has been deleted.');
            res.redirect('/users/login');
        }
    })
})

// POST New Contact ============================================

router.post('/users/newcontact', isLoggedIn, function(req, res) {

    var contName = req.body.contName;
    var contEmail = req.body.contEmail;
    var contPhone = req.body.contPhone;

    req.checkBody('contName', 'Contact Name cannot be empty.').notEmpty();
    req.checkBody('contEmail', 'Contact Email cannot be empty.').notEmpty();
    req.checkBody('contEmail', 'Contact Email is not valid.').isEmail();
    req.checkBody('contPhone', 'Contact Phone Number cannot be empty.').notEmpty();

    var contactErrors = req.validationErrors();

    if(contactErrors) {
        console.log('New user form is not fulfilled.');
        res.render('contacts', {
            title: 'Error',
            errors: contactErrors
        });
    } else {

        var newContact = {
            belongId: req.user.id,
            contname: contName,
            contemail: contEmail,
            contphone: contPhone
        }

        contactModel.addContact(newContact, function(err) {
            if(err) {
                console.log('Error creating new contact.');
                req.flash('errorMsg', 'Error creating new contact.');
                res.redirect('/users/contacts');
            } else {
                req.flash('successMsg', 'New contact created.');
                res.redirect('/users/contacts');
            }
        })
    }

});

// DELETE Contact ===============================================

router.post('/users/deletecont/:id', function(req, res) {

    var contactId = req.params.id;

    contactModel.deleteContact(contactId, function(err) {
        if(err) {
            req.flash('errorMsg', 'Error deleting contact.');
            res.redirect('/users/contacts');
        } else {
            req.flash('successMsg', 'Contact deleted.');
            res.redirect('/users/contacts');
        }
    });
});

// EDIT Contact =================================================

router.post('/users/editcontact', function(req, res) {
    
    var editId = req.body.editId;
    var editName = req.body.editName;
    var editEmail = req.body.editEmail;
    var editPhone = req.body.editPhone;

    req.checkBody('editName', 'Contact Name cannot be empty.').notEmpty();
    req.checkBody('editEmail', 'Contact Email cannot be empty.').notEmpty();
    req.checkBody('editEmail', 'Contact Email is not valid.').isEmail();
    req.checkBody('editPhone', 'Contact Phone Number cannot be empty.').notEmpty();
    req.checkBody('editId', 'Contact Phone Number cannot be empty.').notEmpty();

    var editErrors = req.validationErrors();

    if(editErrors) {
        console.log('Edit form is not fulfilled.');
        res.redirect('/');
        // res.render('contacts', {
        //     title: 'Error',
        //     errors: editErrors
        // });
    } else {

        var editedContact = {
            name: editName,
            email: editEmail,
            phone: editPhone,
            contId: editId
        }

        contactModel.editContact(editedContact, function(err) {
            if(err) {
                req.flash('errorMsg', 'Error updating contact.');
                res.redirect('/users/contacts');
            } else {
                req.flash('successMsg', 'Contact updated.');
                res.redirect('/users/contacts');
            }
        });
    }
});

// Check Authorization for Page Navigation ======================

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('errorMsg', 'Login required to continue.')
        res.redirect('/users/login');
    }
}

function isNotLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        req.flash('errorMsg', 'You are already logged in.');
        res.redirect('/users/contacts');
    } else {
        return next();
    }
}

// Export Module ================================================

module.exports = router;


