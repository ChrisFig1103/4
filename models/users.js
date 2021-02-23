const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id:{
    type:Number
  },
  name:{
    type:String,
    required:true,
    minimum: 5
  },
  age:{
    type:Number,
    required:true
  }
})

module.exports = mongoose.model('User',UserSchema);