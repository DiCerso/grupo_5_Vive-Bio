const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

const methodOverride = require('method-override');


app.use(express.static('public'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'..','public')));

//manipulacion JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*rutas dinámicas */
const indexRouter  = require('./routes/index');
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/users')

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter)


app.listen(port, () => console.log(`Server running in port http://localhost:${port}`));
