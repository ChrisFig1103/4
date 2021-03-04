const mongoose = require('mongoose');

const UserGoogleSchema = new mongoose.Schema({
  googleId:{
    type:String,
  },
  displayName:{
    type:String,
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },email:{
    type:String
  },
  image:{
    type:String
  } 
  
})

module.exports = mongoose.model('UserGoogle',UserGoogleSchema);