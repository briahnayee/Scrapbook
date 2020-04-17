var express = require('express');
var router = express.Router();
const photosCtrl = require('../controllers/photos');
const isLoggedIn = require('../middleware/isLoggedIn')

router.post('/', isLoggedIn, photosCtrl.create);

module.exports = router;