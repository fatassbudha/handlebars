'use strict'
var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
	app.use(express.static( 'misc'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/my', function (req, res) {
    res.render('dash');
});

 
app.listen(2000);