const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv/config');


// Database connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true},() =>
  console.log('Conectado a la base de datos')
);

const usersRouter = require('./routes/users');
const animalsRouter = require('./routes/animals');
const authRouter = require('./routes/auth'); 
const profileRouter = require('./routes/profile');
const indexRouter = require('./routes/index');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./config/passport'); 


const app = express();


app.use(cookieSession({   maxAge: 24 * 60	 * 60 * 1000,   
  keys: ['clave'] //clave para encriptar 
})) 



//Passport
app.use(passport.initialize());
app.use(passport.session());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/auth',authRouter);
app.use('/profile',profileRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
