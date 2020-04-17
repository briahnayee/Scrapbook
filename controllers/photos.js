const Photo = require('../models/photo');
const formidable = require('formidable');

function create(req, res) {
  let photoData = {
    userId: req.user._id
  };
  new formidable.IncomingForm().parse(req)
    .on('field', (name, field) => {
      console.log('Field', name, field);
      photoData.description = field; 
    })
    .on('file', (name, file) => {
      console.log(file.name);
    })
    .on('fileBegin', (name, file) => {
      if (name == 'photo') {
        file.path = __dirname + '/../public/uploads/' + file.name;
        photoData.url = file.name;
        console.log(__dirname);
      }
    })
    .on('end', () => {
      console.log(photoData)
      const photo = new Photo(photoData);
      // req.user.personalProfile.push(photo)
      console.log(req.user)
      photo.save(function (err) {
        // one way to handle errors
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