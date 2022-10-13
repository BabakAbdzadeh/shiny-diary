const express = require('express');
const bodyParser = require("body-parser");
const home = express();


home.set('view engine','ejs')
.set('view engine', 'ejs')
.use(express.static("public"))
.use(bodyParser.urlencoded({
  extended: true
}));

home.get('/', (req, res)=> {
  if(req.isAuthenticated()){

    res.render('profile');
  }else{
    res.send("Not authenticated");
  };
})



module.exports = home;
