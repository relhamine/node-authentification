var express = require('express');
var session = require('express-session');
var passport = require('passport');
var app = express();
var http = require('http').Server(app);

var routes = require('./routes/index');
var LocalStrategy = require('passport-local').Strategy;

var nconf = require('nconf');

var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// view engine setup
app.use(express.static('views'));

/*app.use(express.cookieParser());*/
/*app.use(express.bodyParser());*/

//Jade
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    cookieName: 'session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes);
// Routing
//app.use(express.static(__dirname + '/views'));







var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//Properties file
nconf.argv().env().file({ file:  './resources/conf.json' });

console.log(nconf.get('database').host);








/*// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})*/


/*app.get('/', function (req, res) {
    console.log("XXXXXXXXXXXXXXXXX");
    res.render('formulaire');
});*/

/*app.post('/valider', urlencodedParser, function (req, res) {
    console.log("Ok", req.body)
    res.render('Result', {sayHelloTo: {'Username': req.body.Username, 'password': req.body.password}});
});*/


http.listen(8080, function () {
    console.log('listening on *:8080');
});


