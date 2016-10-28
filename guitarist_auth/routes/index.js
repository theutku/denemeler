//Define Modules ========================

var express = require('express');
var router = express.Router();

//Require Guitarists Data ==============

var appdata = require('../data.json');

//Get Login Page ==========================

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Top Guitarists - Welcome'
  });
});

//Get HomePage ==========================

router.get('/home', function (req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  myGuitarists.forEach(function (item) {
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

router.get('/guitarists', function (req, res) {
  var myArtwork = [];
  var myGuitarists = appdata.guitarists;

  appdata.guitarists.forEach(function (item) {
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

router.get('/guitarists/:guitaristid', function (req, res) {
  var myArtwork = [];
  var myGuitarists = [];

  appdata.guitarists.forEach(function (item) {
    if (item.shortname == req.params.guitaristid) {
      myGuitarists.push(item);
      myArtwork = myArtwork.concat(item.artwork);

    }
  });
  res.render('guitarists', {
    title: myGuitarists[0].title,
    artwork: myArtwork,
    guitarists: myGuitarists,
    page: 'guitarist'
  });
});

//Export Module ================================

module.exports = router;
