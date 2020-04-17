var express = require('express');
var router = require('express').Router();
var passport = require('passport');
const Photo = require('../models/photo');
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/feed',
    failureRedirect: '/home'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/home');
});

router.get('/home', (req, res, next) => {
  res.render('home')
});

router.get('/userProfile', (req, res, next) => {
  Photo.find({}, (err, photos) => {
    console.log(photos)
    res.render('userProfile', { photos: photos });
  });
});

router.get('/createAccount', (req, res, next) => {
  res.render('createAccount')
});

router.get('/feed', isLoggedIn, (req, res, next) => {
  Photo.find({}, (err, photos) => {
    console.log(photos)
    res.render('feed', { photos: photos });
  });
});

router.get('/home', (req, res, next) => {
  res.render('home')
});

router.get('/login', (req, res, next) => {
  res.render('login')
});

router.get('/singlePic/:id', isLoggedIn, (req, res, next) => {
  Photo.findOne({ _id: req.params.id }, (err, photo) => {
    console.log(req.user._id)
    res.render('singlePic', { photo: photo, user: req.user });
  });
});

router.get('/newPhoto', isLoggedIn, (req, res, next) => {
  res.render('newPhoto')
});

router.get('/singlePic/:id/editComment/:commentId', isLoggedIn, (req, res, next) => {
  Photo.findOne({ _id: req.params.id }, (err, photo) => {
    const comment = photo.comments.find((e) => {
      if (req.params.commentId == e._id) {
        return true
      }
      return false
    })
    console.log(comment)
    res.render('editComment', {comment: comment, photo: photo })
  })
})

module.exports = router;
