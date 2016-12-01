const express = require('express');
const router = express.Router();

const Model = require('../models/database');
const userModel = require('../models/user');

router.post('/users/login', (req,res) => {
    
});

router.post('/users/addcontact', resHeader, (req, res) => {
    var newContact = new Model(req.body);
    newContact.save((err, resource) => {
        if(err) {
            console.log('Cannot save new contact to database.');
            res.status(500).send(err);
        } else {
            console.log('New contact saved successfully');
            res.send(resource);
        }
    });
});


function resHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}


module.exports = router;