var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const isLoggedIn = require('../Middleware/isLoggedIn')
const Photo = require('../models/photo');

router.post('/:id', isLoggedIn, commentsCtrl.create);
router.delete('/:id/:commentId', isLoggedIn, commentsCtrl.deleteComment)

router.put('/:id/:commentId/editComment', isLoggedIn, commentsCtrl.editComment)

// router.put('/:id/:commentId/', (req, res, next) => {
//   Photo.findOne({ _id: req.params.id }, (err, photo) => {
//     photos.comments.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     }, (err, comment) => {
//       res.redirect("/:id")
//     })
//   });
// });



module.exports = router;