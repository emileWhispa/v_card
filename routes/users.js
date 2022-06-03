const {User} = require('../databases/models');

var express = require('express');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
var router = express.Router();
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now() + '-'+file.originalname)
  }
})

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('view',{users:await User.findAll()});
});
router.get('/print/:id/:type', async function(req, res, next) {

  var QRCode = require('qrcode')

  const user = await User.findByPk(req.params.id);
  const image = path.join(__dirname, '..', 'public','uploads', user.logo);
  const imageFile = fs.readFileSync(image);
  let logo = Buffer.from(imageFile).toString('base64');

  logo = "data:image/png;base64,"+logo;

  const second = req.params.type === 'second';

  QRCode.toDataURL('BEGIN:VCARD\n' +
      `N:${user.name??''};\n` +
      `TEL;TYPE=work,VOICE:${user.phone1??''}\n` +
      `TEL;TYPE=home,VOICE:${user.phone2??''}\n` +
      `EMAIL:${user.email??''}\n` +
      `ORG:${user.company??''}\n` +
      `TITLE:${user.title??''}\n` +
      `ADR;TYPE=WORK,PREF:;;${user.street??''};${user.city??''};${user.state??''};${user.zip??''};${user.country??''}\n` +
      `URL:${user.website??''}\n` +
      'VERSION:3.0\n' +
      'END:VCARD', function (err, url) {



    res.render( second? 'second_card' :'business_card',{user,url,name:user.name,position:user.position,company:user.company,logo,layout: second ? '' : 'layout'});
  })

});

/* GET users listing. */
router.post('/create/user', upload.single('logo'),async function(req, res, next) {

  const file = req.file

  const body = req.body;
  body.logo = file.filename;

  console.log(User);

  await User.create(body);

  res.redirect('/users');
});

module.exports = router;
