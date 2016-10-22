//Define Modules ========================

var express = require('express');
var router = express.Router();


//Require Guitarists Data ==============

var appdata = require('../data.json');

//Get HomePage ==========================

router.get('/', function(req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  myGuitarists.forEach(function(item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('index', { 
      title: 'Top Guitarists',
      artwork: myArtwork,
      guitarists: myGuitarists,
      page: 'home' 
    });
});


//GET Guitarists Page ==================

router.get('/guitarists', function(req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  appdata.guitarists.forEach(function(item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('guitarists', { 
      title: 'Guitarists',
      artwork: myArtwork,
      guitarists: myGuitarists,
      page: 'guitaristList' 
    });
});


//GET Specific Guitarists Page ==================

router.get('/guitarists/:guitaristid', function(req, res) {
  var myArtwork = [];
  var myGuitarists = [];

  appdata.guitarists.forEach(function(item) {
    if(item.shortname == req.params.guitaristid) {
      myGuitarists.push(item);
      myArtwork = myArtwork.concat(item.artwork);

    }
  });
  res.render('guitarists', { 
      title: 'Guitarists',
      artwork: myArtwork,
      guitarists: myGuitarists,
      page: 'guitarist' 
    });
});

//GET Error Page


//Export Module ================================

module.exports = router;
