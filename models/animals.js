const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  animalsname:{
    type:String,
    required:true
  },
  breedname:{
    type:String,
    required:true
  },
  speciesname:{
    type:String,
    required:true
  },
  animalsage:{
    type:String,
    required:true
  },
  basecolour:{
    type:String,
    required:true
  },
  owner:{
    type:Number
  }

})

module.exports = mongoose.model('Animal',AnimalSchema);