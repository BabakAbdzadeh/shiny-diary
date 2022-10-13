const express = require('express');
const bodyParser = require("body-parser");
const home = express();
// const login = require('./loginRegister.js');
// For auth level 5
// const session = require("express-session");
// const passport = require("passport");

home.set('view engine', 'ejs')
.use(express.static("public"))
.use(bodyParser.urlencoded({
  extended: true
}))
.use(bodyParser.json());


home.get('/', (req, res)=> {
  if(req.isAuthenticated()){

    res.render('home');
  }else{
    res.send("Not authenticated");
  }
})



module.exports = home;
