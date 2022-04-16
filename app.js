var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");


const connectionString =  process.env.MONGO_CON || "mongodb+srv://MaheshN:Maheshn1@cluster0.g2pae.mongodb.net/Project0?retryWrites=true&w=majority";
console.log(connectionString);
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){
   console.log("Connection to DB succeeded");
    recreateDB();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toolsRouter = require('./routes/tools');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var Tools = require("./models/tool");

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/selector',selectorRouter);
app.use('/addmods',addmodsRouter);
app.use('/tools',toolsRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource',resourceRouter);

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



// We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await Tools.deleteMany(); 
 
  let instance1 = new Tools({name:"ghost", version:"2.3.3", cost:25.4}); 
  let instance2 = new Tools({name:"ghostly", version:"2.3.5", cost:223.7}); 
  let instance3 = new Tools({name:"Aish", version:"4.3.5", cost:42.0});


    instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  }); 

  
    instance2.save( function(err,doc) { 
        if(err) return console.error(err); 
        console.log("Second  object saved") 
    }); 

     
      instance3.save( function(err,doc) { 
          if(err) return console.error(err); 
          console.log("Third  object saved") 
      }); 
} 
module.exports = app;