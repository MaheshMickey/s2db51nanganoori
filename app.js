var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  }));

const mongoose = require("mongoose");


const connectionString = 'mongodb+srv://MaheshN:Maheshn1@cluster0.g2pae.mongodb.net/Project0?retryWrites=true&w=majority';
console.log(connectionString);
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){
   console.log("Connection to DB succeeded")});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toolsRouter = require('./routes/tool');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var tool = require("./models/tool");

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource',resourceRouter);
app.use('/selector',selectorRouter);
app.use('/addmods',addmodsRouter);
app.use('/tool',toolsRouter);

var Account =require('./models/account');
 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

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
  await tool.deleteMany(); 
 
  let instance1 = new tool({name:"ghost", version:"2.3.3", cost:25}); 
  let instance2 = new tool({name:"ghostly", version:"2.3.5", cost:223}); 
  let instance3 = new tool({name:"Aish", version:"4.3.5", cost:42});


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

let reseed = true;
if(reseed){ recreateDB();}

module.exports=app;