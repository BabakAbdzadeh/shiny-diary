// Feature edit : maybe
// 1. plugin
// 2. id from String to Number
// 3. comment as subdocument instead of nested
 //  ADD {path: '../.env'} to config() for running node for this js file
require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");


const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const url = `mongodb://${username}:${password}@ac-ajq1i8g-shard-00-00.ithr0wo.mongodb.net:27017,ac-ajq1i8g-shard-00-01.ithr0wo.mongodb.net:27017,ac-ajq1i8g-shard-00-02.ithr0wo.mongodb.net:27017/shiny-diary?ssl=true&replicaSet=atlas-10662p-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(url);



// Schema
// Messenger
const messageSchema = new mongoose.Schema({
    from_user_id: String,
    message_text: String,
    send_datetime: Date
});

const conversationSchema = new mongoose.Schema({
  participants: [String],
  messages: [messageSchema],
});

// Post
const controlSchema = new mongoose.Schema({
  is_anonymous : Boolean,
  is_sharable: Boolean,
  is_commentable : Boolean,
  is_public : Boolean,
});
const postSchema = new mongoose.Schema({
  profile_id: String,
  written_text: {
    title: String,
    breif_description: String,
    body: String,
  },
  media_location: String,
  created_datetime: Date,
  plugin: [{
    plugin_id: String
  }],
  likes: [{
      profile_id: String,
      created_datetime: Date
  }],
  comments: [{
    profile_id: String,
    comment: String,
    created_time: Date
  }],
  control: [controlSchema],

})
// To_remmebr
const to_rememberSchmea = new mongoose.Schema({
  tasks : [{
    title : String,
    description: {
      type: String,
      default : ""
    }
  }],
  created_datetime: Date
})

//  User
const userSchema = new mongoose.Schema({
  email_address: String,
  username: String,
  password: String,
  given_name: String,
  surname: String,
  date_of_birth: Date,
  country: String,
  posts: [postSchema],

  to_remember: [to_rememberSchmea],

  friends_id: [String],
  conversations: [conversationSchema],
  media_location: String,
  bio: String,
  api_key: String
});
userSchema.plugin(passportLocalMongoose);


//  MODELS
const Conversation = new mongoose.model('conversation', conversationSchema);
const To_remember = new mongoose.model('to_remember', to_rememberSchmea);
const Post = new mongoose.model('post', postSchema);
const User = new mongoose.model('user', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Export
module.exports = {Conversation, Post, To_remember, User};
