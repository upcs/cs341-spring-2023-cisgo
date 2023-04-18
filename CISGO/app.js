var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const { componentLoader, Components } = require('./components');
const AdminJSSequelize = require('@adminjs/sequelize')
const { Pin } = require('./entities/pin.model')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRedirectRouter = require('./routes/admin');
var dbRouter = require('./routes/db');

var app = express();

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
app.use('/admin', adminRedirectRouter);
app.use('/db', dbRouter);

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

const PORT = 3001

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})

const adminApp = express()

const start = async () => {
  
  const admin = new AdminJS({
    dashboard: {
      component: Components.Dashboard
    },
    componentLoader,
    resources: [Pin]
  })

  const adminRouter = AdminJSExpress.buildRouter(admin)
  adminApp.use(admin.options.rootPath, adminRouter)

  adminApp.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}
start();

module.exports = { app, adminApp };
