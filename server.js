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
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var http = require('http').Server(app);
var io = require('socket.io')(http);

//-------------------------- Uses

app.use(express.static(__dirname + '/public'));
app.use(urlencodedBodyParser);
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(cookieParser());
// app.use(session({ secret: 'secret',
//                   resave: false,
//                   saveUninitialized: false
//                 })); 
// app.use(passport.initialize());
// app.use(passport.session()); 

//--------------------------

var info = [ {
	name: "Shoes",
	price: 20 
}, {
	name: "Picture Frame",
	price: 15
} ]

app.get('/', function (req, res) {
    var auctionsTemplate = fs.readFileSync('views/templates/auctions.html.ejs')
    res.render('index.html.ejs', {info : info});
})

app.post('/', function (req, res) {
		var name = req.body.name
		var price = parseInt(req.body.price)
		info.push({name: name, price: price})
		io.emit('newItem', info)
})



io.on('connection', function(socket){
  socket.on('bid', function(data){
  	var index = data.index
  	info[index].price += parseInt(data.amount)

    io.emit('bid', info.concat([index]));
  });
});

http.listen(3000, function () {
    console.log('server ready to rock');
})