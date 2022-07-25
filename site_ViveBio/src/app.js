var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var app = express();
const localsCheck = require('./middlewares/localsCheck');
const cookieCheck = require('./middlewares/cookieCheck');

const session = require('express-session');

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/users');
const indexRouterApi = require('./routes/api/index');
const productsRouterApi = require('./routes/api/product'); 



// view engine setup
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'..','public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret : 'ViveBio proyect',
  resave: false,
  saveUninitialized: true,
  cookie : {}
}));
app.use(cookieCheck);
app.use(localsCheck);


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/api', indexRouterApi);
app.use('/api/products', productsRouterApi);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;