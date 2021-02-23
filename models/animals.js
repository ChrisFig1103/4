const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
  id:{
    type:Number
  },
  animalsname:{
    type:String,
    required:true,
    minimum: 5
  },
  breedname:{
    type:String,
  },
  speciesname:{
    type:String,
  },
  animalsage:{
    type:String,
    required:true
  },
  basecolour:{
    type:String,
  },
  owner:{
    type:Number
  }

})

module.exports = mongoose.model('Animal',AnimalSchema);