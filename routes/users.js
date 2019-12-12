var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "saxionconnect"
});

con.connect(function(err) {
  if (err) throw err;
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  con.query("SELECT * FROM users", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
/* GET users listing. */
router.post('/login', function(req, res, next) {
  con.query("SELECT * FROM users where email = ?", req.body.email, function (err, result) {
    if (err) throw err;
    //TODO add interests
    res.json(result);
  });
});

/* GET users listing. */
router.post('/register', function(req, res, next) {
  let user = {
    'email': req.body.email,
    'fname': req.body.fname,
    'infix': req.body.infix,
    'lname': req.body.lname,
  };
  con.query("INSERT INTO users(email,fname,infix,lname) VALUES(?,?,?,?)",[user.email, user.fname, user.infix, user.lname], function (err, result) {
    if (err) throw err;
    con.query(`SELECT * FROM users WHERE id = ?`, result.insertId, function (err, userRecord) {
      res.json(userRecord[0]);
    });

  });
});


/* GET users listing. */
router.get('/:id', function(req, res) {
  let id = req.params.id;
  con.query(`SELECT * FROM users WHERE id = ?`, id, function (err, userRecord) {
    let user = userRecord[0];
    console.log(user.id);
    con.query('SELECT interests.id, interests.name, interests.weight FROM users_interests INNER JOIN interests on users_interests.iId = interests.id WHERE users_interests.uid = ?', user.id, (err, userInterests) => {
      console.log(err, userInterests);
      user.interests = [];
      for (let i = 0; i < userInterests.length; i++) {
        user.interests.push(userInterests[i]);
      }
      res.json(user);
    });
  });
});

module.exports = router;
