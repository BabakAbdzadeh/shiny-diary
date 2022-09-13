//  ------------------ requirements ------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const login = express();

// For auth level 5
const session = require("express-session");
const passport = require("passport");



// --------------- initialization ---------------

login.set('view engine', 'ejs')
.use(express.static("public"))
.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json())
.use(session({
  secret: 'A Saucerful of Secrets',
  resave: false,
  saveUninitialized: true,
  cookie:{
    // HTTPS is necessary for secure cookies
    secure: false
  }
}))
.use(passport.initialize())
.use(passport.session());

// ---------------- root path --------------------
const path = require('path');
const rootPath = path.join(__dirname, '../');
// ---------------- Connecting to DB and models
const db = require(rootPath + "models/dbModels.js");
const User = db.User;

//  -------------- service-----------------------
login.get('/', (req,res)=>{
  res.render('login');

})

.post('/',(req,res)=>{
  const user = new User({
    username : req.body.username,
    password: req.body.password
  });
  req.login(user, (err)=>{
    if(err){
      console.log(err);
    }else{
      passport.authenticate('local')(req,res,()=>{
        res.redirect('/home');
      });
    }
  });
})
.get('/register', (req,res)=>{
  res.render('register');
})
.post('/register',(req, res)=>{
  User.register({username: req.body.username}, req.body.password, (err, user)=>{
    if(err){
      console.log(err);
      res.redirect('/register');
    }else{
      passport.authenticate('local')(req, res, ()=>{
        res.redirect('/home');
      })
    }
  })
})
.get('/home', (req,res)=>{
  if(req.isAuthenticated()){
    // ----------- TEST -----------
    console.log('authenticated');
    // ---------------------------
    res.render('auth-page-test');
  }else{
    // ----------- TEST -----------
    console.log(" not authenticated");
    // ---------------------------
    res.redirect('/');
  }
});

//  -------------- export ----------------------
module.exports = login;
