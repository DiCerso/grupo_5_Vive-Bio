const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/product');


app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.set('views', __dirname + '/views'); 
app.set(path.resolve('views', __dirname + '/src/views'));

  
module.exports = app;

app.listen(port, () => console.log(`Server running in port http://localhost:${port}`));