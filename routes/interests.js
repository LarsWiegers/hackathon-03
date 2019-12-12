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
  con.query("SELECT * FROM interests", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

/* GET users listing. */
router.get('/:id', function(req, res) {
  let id = req.params.id;
  con.query("SELECT * FROM interests WHERE id = ?", id, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

module.exports = router;
