const Photo = require('../models/photo')

function create(req, res) {
  const commentData = {
    userId: req.user._id,
    text: req.body.content
  };
  Photo.findById(req.params.id, function(err, photo) {
    photo.comments.push(commentData);
    photo.save(function(err) {
      res.redirect(`/singlePic/${photo._id}`);
    });
  });
}

const deleteComment = (req, res) => {
  Photo.findById(req.params.id, function(err, photo) {
    for (let i=0; i<photo.comments.length; i++) {
      if (photo.comments[i]._id == req.params.commentId && photo.comments[i].userId == req.user._id.toString()){
        photo.comments.splice(i, 1)
      }
    }
    photo.save(function(err) {
      res.redirect(`/singlePic/${photo._id}`)
    })
  })
}

const editComment = (req, res) => {
  Photo.findById(req.params.id, function(err, photo) {
    for (let i=0; i<photo.comments.length; i++) {
      if (photo.comments[i]._id == req.params.commentId && photo.comments[i].userId == req.user._id.toString()) {
        photo.comments[i].text = req.body.text;
      }
    }
    photo.save(function(err) {
      res.redirect(`/singlePic/${photo._id}`);
    });
  });
}

module.exports = {
  create,
  deleteComment,
  editComment,
};
