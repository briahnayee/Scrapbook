var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
console.log('pass')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function (err, user) {
      if (err) return cb(err);
      console.log('user', user)
      if (user) {
          return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        console.log('saving')
        newUser.save(function (err) {
          console.log('saved', err);
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function (user, done) {
  console.log('serial')
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('deserial')
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
