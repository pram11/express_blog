var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var sequelize = require('./model').sequelize;   // mysql 시퀄라이저 모델
var nunjucks = require('nunjucks')

var app = express();
app.set('view engine', 'html');
nunjucks.configure('views',{
    autoescape:true,
    express:app
});
sequelize.sync().then(()=>{
  console.log("sync complete")
  
});   //서버가 실행될때 시퀄라이저의 스키마를 DB에 적용시킨다.



// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);


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
