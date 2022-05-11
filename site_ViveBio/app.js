const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, '..', 'public')));
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

/*rutas dinámicas */
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/users')


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter)

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
