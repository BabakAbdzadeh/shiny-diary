const express = require('express');
const app = express();


app.use('/', require('./services/loginRegister.js'))
.listen(3000, ()=>{
  console.log("Server started on port 3000");
});
