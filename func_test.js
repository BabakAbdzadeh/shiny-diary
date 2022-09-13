const db = require("./models/dbModels.js");

const date = new Date();


console.log(date);


const babak = new db.User({
  email_address: 'galendiadep@gmail.com',
  username: 'galendiadep',
  password: 'orlando323232b2',
  given_name: 'babak',
  surname: 'abd zadeh',
  date_of_birth: '1995-11-9',
  country: 'Iran',

  bio: 'young and dumb yani',
  api_key: 'this api key is just a test'

});

const first_remember = new db.To_remember({
  tasks: [{
    title: 'first of all'
  },{
    title: 'second of all'
  }],
  created_datetime : date,
})

// babak.save(()=>{
//   console.log("done!");
// });
//
// first_remember.save(()=>{
//   console.log("done 2");
// });

db.User.findByIdAndUpdate('63138f92104183a330b2e9f7', {to_remember : [first_remember]}, ()=>{
  console.log('done updating');
});
