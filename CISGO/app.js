var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var AdminJS = require('adminjs');
var AdminJSExpress = require('@adminjs/express');
const { Database, Resource } = require('@adminjs/mikroorm');
const {MikroORM} = require('@mikro-orm/core');
//import { validate } from 'class-validator';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/db');

const PORT = process.env.PORT ?? 3000;
//var adminRouter = require('./routes/admin');


var app = express();

const adminJs = new AdminJS({
  databases: [],
  rootPath: '/admin'
})
const adminRouter = AdminJSExpress.buildRouter(adminJs);

const run = async () => {
  /* Initialize MikroORM like you would do normally, you can also import your MikroORM instance from a separate file */
  const orm = await MikroORM.init({
    //entities: [User, Car, Seller], // use your own entities
    dbName: 'cisgo',
    type: 'mariadb',
    clientUrl: '10.13.6.44',
    user: 'cisgouser',
    password: "cisgo"
  });

  /* Optional: if you're using class-validator, assign it to Resource */
  Resource.validate = validate;
  /* Tell AdminJS which adapter to use */
  AdminJS.registerAdapter({ Database, Resource });

  //const app = express();

  /* Create AdminJS instance */
  const admin = new AdminJS({
    databases: [orm],
  });

  const router = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, router);

  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
}

app.use(adminJs.options.rootPath, adminRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/db', dbRouter);
//app.use('/admin', adminRouter);

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
