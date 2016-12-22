'use strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = express();

    var globDb2;
    var globShout;
    var del;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/profs',function(req,res) {
  res.send(JSON.stringify(globDb2));
});
app.get('/shouts',function(req,res) {
  res.send(JSON.stringify(globShout));
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
	app.use(express.static( 'misc'));

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/my', function (req, res) {
    res.render('dash');
});

app.get('/new?', function (req, res) {
    res.render('shout');
}); 
app.post('/new?',function(req,res) {

    console.log(req.body);
    var userID = req.body.user;
    var outs = req.body.out;
    var profToShout = {
      user : userID,
      out : outs
    }

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var query = connection.query('INSERT INTO shout2 set ?',
                                  profToShout,function (err, result){
    console.log(query.sql);
    });
     
    connection.query('SELECT * FROM shout2', function(err, rows, fields) {
        globShout = rows;
    });
    connection.end();
});

app.get('/delete', function (req, res) {
    res.render('delete');
});
app.post('/delete',function(req,res) {

  var counter = 0;
  var id = req.body.id2del;

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var sql = 'DELETE FROM profiles WHERE ID =  "' + id;
    sql = sql + '"';
    connection.query(sql, function(err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Delete Successful!");
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'db2'
      });
      res.render('dash');
      connection.connect();
      connection.query("SELECT * FROM profiles", function(err, rows, fields) {
        if (err) {
          console.error(err);
          return;
        } else {
          globDb2 = rows;
        }
      });
    });
    connection.end();
});
app.get('/update', function (req, res) {
    res.render('upAcc');
});
app.post('/update',function(req,res) {

    var nuname = req.body.newuser;
    var id = req.body.updateid;

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();
    var sql = 'UPDATE profiles SET username = "' + nuname;
    sql = sql + '" WHERE ID = ' + id;
    connection.query(sql, function(err, rows, fields) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Update Successful!");
      res.render('home');
    });
    connection.end();
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
    connection.query('SELECT * FROM profiles', function(err, rows, fields) {
        globDb2 = rows;
    });
    connection.end();

});

app.get('/signup', function (req, res) {
    res.render('register');
});
app.post('/signup',function(req,res) {

    console.log(req.body);
    var id = null;
    var uname = req.body.username;
    var pword = req.body.password;
    var profTodb2 = {
      id : id,
      username : uname,
      password : pword
    }

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var query = connection.query('INSERT INTO profiles set ?',
                                  profTodb2,function (err, result){
    console.log(query.sql);
    });
     
    connection.query('SELECT * FROM profiles', function(err, rows, fields) {
        globDb2 = rows;
    });
    connection.end();
});
app.get('/signup2', function (req, res) {
    res.render('register2');
});
app.post('/signup2',function(req,res) {

    console.log(req.body);
    var id = null;
    var uname = req.body.username;
    var pword = req.body.password;
    var profTodb2 = {
      id : id,
      username : uname,
      password : pword
    }

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var query = connection.query('INSERT INTO profiles set ?',
                                  profTodb2,function (err, result){
    console.log(query.sql);
    });
     
    connection.query('SELECT * FROM profiles', function(err, rows, fields) {
        globDb2 = rows;
    });
    connection.end();
});
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();
     
    connection.query('SELECT * FROM profiles', function(err, rows, fields) {
        globDb2 = rows;
    });
     
    connection.query('SELECT user, out FROM shout2 ', function(err, rows, fields) {
        globShout = rows;
    });
    connection.end();
app.listen(3000);