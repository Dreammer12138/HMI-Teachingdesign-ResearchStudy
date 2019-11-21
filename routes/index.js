var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

var connection = mysql.createConnection({
	host	: '59.110.235.60',
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
  res.send("true");
})

router.post('/signup', urlencodedParser, (req, res) => {
  connection.connect();

  var ID = req.body.Email;
  var Name = req.body.Name;
  var Gender = req.body.Gender;
  var School = req.body.School;
  var Type = req.body.Type;

  res.send("true");
})

module.exports = router;
