var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { User } = require('./models/User');
const { Model } = require('objection');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');

const Knex = require('knex');
const knexConfig = require('./knexfile');
// Initialize knex.
const knex = Knex(knexConfig.development);
Model.knex(knex);

var app = express();

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret',
  userid:-1
}));

//rout
app.get('/login', function(req, res){
 
  if(typeof req.session.userid !== "undefined"){
    res.redirect('/profile');
  }
  res.render('login', { message: '' });
});

//rout
app.get('/registration', function(req, res){

  if(typeof req.session.userid !== "undefined"){
    res.redirect('/profile');
  }
  res.render('registration');
});


app.get('/logout', function(req, res){

req.session.destroy();

  res.render('login', { message: '' });
});



app.get('/profile', async function(req, res){

  if(typeof req.session.userid == "undefined"){
    res.redirect('/login');
  }

  const insertedGraph = await User.transaction(async trx => {
  
    const insertedGraph = await User.query(trx)
    .where('id', req.session.userid)

    return insertedGraph
  })
 
  res.render('profile', { user:insertedGraph[0] });

});

// cheack login

app.post('/loginfunction', async function(req, res){
  
  const insertedGraph = await User.transaction(async trx => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
    const insertedGraph = await User.query(trx)
  .where('email', email).andWhere('password', password);
  
    return insertedGraph
  })

  if(insertedGraph.length ==0){
    res.render('login', { message: 'wrong email or password' });

  }else{
   
    req.session.userid=insertedGraph[0].id;
  
    res.redirect('/profile');
  //  res.render('profile', { user: insertedGraph[0] });

  }

});


app.post('/edit_profile', async function(req, res){
  
  const insertedGraph = await User.transaction(async trx => {

    const insertedGraph = await User.query(trx)
      .findById(req.session.userid)
      .patch(req.body)

    return insertedGraph
  })
 
  res.render('profile', { user: req.body });

});


app.post('/regfunction', async function(req, res){
	
  const insertedGraph = await User.transaction(async trx => {
    const insertedGraph = await User.query(trx)
      .insertGraph(req.body)
     
    return insertedGraph
  })
  res.render('login', { message: '' });

});


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
