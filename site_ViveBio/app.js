const express = require('express');
const path = require('path');
const app = express();
const port = 3030;


app.use(express.static(path.joiin(__dirname,'public')));

// View engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

/*rutas dinámicas */
const indexRouter  = require('./routes/index');
const productsRouter = require('./routes/product');

app.get('/', indexRouter);
app.get('/productAll', productsRouter);
app.get('/productCard', productsRouter);

module.exports = app;


app.listen(port, () => console.log(`Server running in port http://localhost:${port}`));