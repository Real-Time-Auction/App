//-------------------------- Requires
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var request = require('request');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

//-------------------------- Uses

app.use(express.static('public'));
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view_engine', 'ejs');
app.use(cookieParser());
// app.use(session({ secret: 'secret',
//                   resave: false,
//                   saveUninitialized: false
//                 })); 
// app.use(passport.initialize());
// app.use(passport.session()); 

//--------------------------