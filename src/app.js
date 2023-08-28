
const express = require('express');
// const createError = require('http-errors');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



var app = express();

// const authapi = require('./routes/auth.route.js');
const auth = require('./routes/auth.js');
const dashboard = require('./routes/dashboard.js');
const product = require('./routes/product.js');
// const categoryRouter = require('./src/routes/category.router');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../public/')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', auth);
app.use('/', dashboard);
app.use('/products', product);
// app.use('/dashboard/category', categoryRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.get('*', function (req, res) {
  res.send('no route ...', 404);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log('Log-Error', err)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;