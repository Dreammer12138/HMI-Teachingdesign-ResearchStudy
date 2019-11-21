var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

var connection = mysql.createConnection({
	host	: 'localhost',
	user  	: 'root',
	password: '123456',
	database: 'HIM'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('html/index.html');
});
router.post('/signin', urlencodedParser, (req, res) => {
  var ID = req.body.No;
  var Passwd = req.body.Passwd;
  console.log(req.body);
})

router.post('/signup', urlencodedParser, (req, res) => {
  connection.connect();

  var ID = req,body.Email;
  var Name = req.body.Name;
  var Gender = req.body.Gender;
  var School = req.body.School;
  var Type = req.body.Type;

})

module.exports = router;
