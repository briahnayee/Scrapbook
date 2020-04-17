const Photo = require('../models/photo');
const formidable = require('formidable');

function create(req, res) {
  let photoData = {
    userId: req.user._id
  };
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      photoData.description = field; 
    })
    .on('fileBegin', (name, file) => {
      if (name == 'photo') {
        file.path = __dirname + '/../public/uploads/' + file.name;
        photoData.url = file.name;
      }
    })
    .on('end', () => {
      const photo = new Photo(photoData);
      photo.save(function (err) {
        if (err)
          return res.redirect('/newPhoto');
        else {
          console.log(photo);
          res.redirect('/feed');
        }
      })
    })
}

const index = (req, res) => {
  Photo.find({}, (err, photos) => {
    res.render('photos/index', {photos: photos, user: req.user });
  });
}


module.exports = {
  create,
  index
};