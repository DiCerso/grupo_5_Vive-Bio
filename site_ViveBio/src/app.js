const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
require('./loginGoogle');
require('./loginFacebook');

//session
const session = require('express-session');
const localsCheck = require('./middlewares/localsCheck');
const cookieCheck = require('./middlewares/cookieCheck');

//routes
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/category');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact')
// routes api
const indexRouterApi = require('./routes/api/index');
const productsRouterApi = require('./routes/api/product');
const usersRouterApi = require('./routes/api/users');


// view engine setup
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'ViveBio proyect',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));
app.use(cookieCheck);
app.use(localsCheck);


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

app.use('/api', indexRouterApi);
app.use('/api/products', productsRouterApi);
app.use('/api/users', usersRouterApi);

/* PASSPORT GOOGLE*/

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));


app.get('/login/facebook', passport.authenticate('facebook', {
  scope: ['email', 'user_location']
}));


app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, async (req, res) => {
  const db = require('./database/models')
  try {
    let user = await db.User.findOne({
      where: {
        email: req.user.email
      },
      include: [
        { association: 'rol' }
      ]
    })
    if (user) {
      req.session.userLogin = {
        id: +user.id,
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        image: user.image,
        username: user.username.trim(),
        rol: user.rol.name.trim(),
        ubication: user.ubication ? user.ubication.trim() : null
      }
      if (req.body.remember) {
        res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      }
      return res.redirect('/');
    }
    if (!user) {
      const newuser = await db.User.create({
        firstname: req.user.name.givenName.trim(),
        lastname: req.user.name.familyName.trim(),
        username: req.user.email.trim(),
        email: req.user.email.trim(),
        rol_id: 2,
        image: "defaultAvatar.png"
      })
      req.session.userLogin = {
        id: newuser.id,
        username: newuser.username,
        rol: "user",
        image: newuser.image,
        ubication: null
      }
      res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error)
  }
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

/* END GOOGLE SIGN IN */

/* START FACEBOOK SIGN IN */

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/protectedsafe',
    failureRedirect: '/auth/facebook/failure'
  })
);

app.get('/protectedsafe', async (req, res) => {
  const db = require('./database/models')
  try {
    let user = await db.User.findOne({
      where: {
        email: req.user.emails[0].value
      },
      include: [
        { association: 'rol' }
      ]
    })
    if (user) {
      req.session.userLogin = {
        id: user.id,
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        image: user.image,
        username: user.username.trim(),
        rol: user.rol.name.trim(),
        ubication: user.ubication ? user.ubication.trim() : null
      }
      if (req.body.remember) {
        res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      }
      return res.redirect('/');
    }
    if (!user) {
      const newuser = await db.User.create({
        firstname: req.user.name.givenName.trim(),
        lastname: req.user.name.familyName.trim(),
        username: req.user.emails[0].value.trim(),
        email: req.user.emails[0].value.trim(),
        rol_id: 2,
        image: "defaultAvatar.png"
      })
      req.session.userLogin = {
        id: newuser.id,
        username: newuser.username,
        rol: "user",
        image: newuser.image,
        ubication: null
      }
      res.cookie('userViveBio', req.session.userLogin, { maxAge: 1000 * 60 * 10 })
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error)
  }
});

app.get('/auth/facebook/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


/* END FACEBOOK SIGN IN */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;