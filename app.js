const express = require('express');
const app = express();


app.use('/', require('./services/loginRegister.js'))
.use('/home', require('./services/home.js'))
.use('/profile', require('./services/profile.js'))
.listen(3000, ()=>{
  console.log("Server started on port 3000");
});
