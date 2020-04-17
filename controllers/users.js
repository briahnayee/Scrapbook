const User = require('../models/user')

function index(req, res, next) {
    User.find({}, (users) => {
      res.render('users/index', {
        users,
        user: req.user
      });
    });
  }


  module.exports = {
    index
  };