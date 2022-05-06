const express = require('express');
const path = require('path');
const app = express();
const port = 3030;


/*Routers*/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product');

/*Middlewares*/
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

/*Routes*/
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/product', productsRouter)

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs'); 

  
module.exports = app;

app.listen(port, () => console.log(`Server running in port http://localhost:${port}`));

