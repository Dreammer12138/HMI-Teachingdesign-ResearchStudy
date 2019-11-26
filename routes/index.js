var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false});

var connection = mysql.createConnection({
	host	: '140.143.72.10',
	user  	: 'root',
	password: '123456',
	database: 'test'
});
connection.connect();

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
  

  var ID = req.body.Email;
  var Name = req.body.Name;
  var Gender = req.body.Gender;
  var School = req.body.School;
  var Type = req.body.Type;
  var Major = req.body.Major;
  var Passwd = req.body.Passwd;
  var TeacherNo;
  var StudentNO;
  var StudentClass;
  if(Type === 'Teacher') {
    TeacherNo = req.body.TeacherNo;
    var _select_teacher_SQL = 'select count(*) from Teacher where TeacherNo = ? ;';
    var _select_teacher_Params_ = [TeacherNo];
    connection.query(_select_teacher_SQL, _select_teacher_Params_, (err, res) => {
      if(err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      else {
        var _insert_teacher_SQL = 'insert into Teacher (TeacherNo, TeacherName, Gender, School, Major, User_ID, Password) values(?, ?, ?, ?, ?, ?, ?);';
        var _insert_teacher_Params = [TeacherNo, Name, Gender, School, Major, ID, Passwd];
        connection.query(_insert_teacher_SQL, _insert_teacher_Params, (err, res) => {
          if(err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
          }
        })
      }
    })
    res.send("OK");
  }
  else if(Type === 'Student') {
    StudentNO = req.body.StudentNo;
    StudentClass = req.body.Class;
    var _select_student_SQL = 'select count(*) from Student where StudentNo = ? ;';
    var _select_student_Params_ = [StudentNO];
    connection.query(_select_student_SQL, _select_student_Params_,(err, res) => {
      if(err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      else {
        var _insert_student_SQL = 'insert into Student (StudentNO, StudentName, Gender, School, Major, Class, User_ID, Password) values (?, ?, ?, ?, ?, ?, ?, ?);';
        var _add_insert_Params_ = [StudentNO, Name, Gender, School, Major, StudentClass, ID, Passwd];

        connection.query(_insert_student_SQL, _add_insert_Params_,(err, res) => {
          if(err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
          }
        })
      }
    })
    res.send("OK");
  }
})

module.exports = router;
