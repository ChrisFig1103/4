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
    type:String
  }

})
AnimalSchema.statics.actualizarAnimal = async (_id, animalData) => {
  console.log("datos a guardar", animalData)
  let updated ={}
  try {
    updated = await animal.updateOne(
          {_id:_id}, 
          {$set: animalData}
        );
  } catch (error) {
      console.log(error)
  }

console.log("actualizado", updated);
return updated;
};

 
module.exports = mongoose.model('Animal',AnimalSchema);
 