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
app.get('/del',function(req,res) {
  res.send(JSON.stringify(del));
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
	app.use(express.static( 'misc'));

app.get('/', function (req, res) {
    res.render('home');
});
/*
app.delete('/',function(req,res) {

    console.log(req.body);
    var id = req.body.userID;
    var del = {
      id : id
    }

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var query = connection.query('Delete FROM profiles where  id = id',
                                  del,function (err, result){
    console.log(query.sql);
    });
    connection.end();
});
*/
app.get('/update', function (req, res) {
    res.render('upAcc');
}); 
app.get('/new?', function (req, res) {
    res.render('shout');
}); 
/*
app.post('/new?',function(req,res) {

    console.log(req.body);
    var userID = req.body.userID;
    var outs = req.body.outs;
    var profToShout = {
      userID : userID,
      outs : outs
    }

    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'db2'
    });
     
    connection.connect();

    var query = connection.query('INSERT INTO shout set ?',
                                  profToShout,function (err, result){
    console.log(query.sql);
    });
     
    connection.query('SELECT * FROM shout', function(err, rows, fields) {
        globShout = rows;
    });
    connection.end();
});
*/
app.get('/my', function (req, res) {
    res.render('dash');
});/*
app.post('/my',function(req,res) {

    console.log(req.body);
    var id = null;
    var nuname = req.body.nusername;
    var npword = req.body.npassword;
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

    var query = connection.query('UPDATE profiles set username = ',
                                  profTodb2,function (err, result){
    console.log(query.sql);
    });
     
    connection.query('SELECT * FROM profiles', function(err, rows, fields) {
        globDb2 = rows;
    });
    connection.end();
});
*/
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
     
    connection.query('SELECT userID, outs FROM shout LEFT JOIN profiles ON shout.userID = profiles.id', function(err, rows, fields) {
        globShout = rows;
    });
    connection.end();
app.listen(3000);