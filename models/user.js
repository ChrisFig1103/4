  
const mongoose = require('mongoose');
const {
    mongo
} = require('mongoose');

const UserSchema = mongoose.Schema({
  id:{
    type:Number
  },
  name:{
    type:String,
  },
  age:{
    type:Number,
  },
  email:{
    type:String,
  },
  image:{
    type:String,
  }
})

let user= mongoose.model('Users',UserSchema);
module.exports = user;