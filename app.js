var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
//var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
//var messagebird = require('messagebird')('                  ');
//var MongoStore = require('connect-mongo')(session);
//var config = require('./config/database');

//Connect to database
mongoose.connect('mongodb://localhost/webapp');
var db = mongoose.connection;
//On connection
// mongoose.connection.on('connected', () => {
//     console.log('Connected to database '+config.database);
// });
//On error
// mongoose.connection.on('error', (err) => {
//     console.log('Database error '+err);
// });

//Init App
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');
var admins = require('./routes/admins');

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// require('./config/passport'); 

//CORS Middleware
//app.use(cors());

//app.set('view engine', 'ejs');
//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set static folder to save client-side files
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
    //store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());
// require('./config/passport')(passport);  

//Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Connect flash
app.use(flash());

//Global Vars
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/admins',admins);

//Index Route
// app.get('/', function(req, res){
//     res.send('Hello World!');
// });

//Set port
app.set('port', (process.env.PORT || 3000));

//Start Server
app.listen(app.get('port'),function(){
    console.log('Server started on port '+app.get('port'));
});

  