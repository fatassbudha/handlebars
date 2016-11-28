'use strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var app = express();

    var globDb2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/profs',function(req,res) {
  res.send(JSON.stringify(globDb2));
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

app.get('/jason', function (req, res) {
    res.render('accs.json');
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
    connection.end();
app.listen(3000);