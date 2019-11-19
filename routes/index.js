var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('html/index.html');
});
router.post('/signin', urlencodedParser, (req, res) => {
  var ID = req.body.No;
  var Passwd = req.body.Passwd;
  console.log(ID)
  console.log(Passwd)
})

router.post('/signup', urlencodedParser, (req, res) => {
  var Email = req.body.Email;
  var Name = req.body.Name;
  var Gender = req.body.Gender;
  var School = req.body.School;
  var Grade = req.body.Grade;
  var Class = req.body.Class;
  var SchoolNo = req.body.SchoolNo;
  var Passwd = req.body.Passwd;
})

module.exports = router;
