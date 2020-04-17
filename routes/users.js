var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/', usersCtrl.index);
// router.post('/photo', isLoggedIn, usersCtrl.addPhoto);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}



module.exports = router;
