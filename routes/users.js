let express = require('express');
let router = express.Router();
const AnimalSchema = require('../models/animals');
/* GET users listing. */
router.get('/', async (req, res) => {
  try{
    const animals = await AnimalSchema.find();
    let  users = animals.map(animal => animal.owner);
    res.json(users);
  }catch(err){
    res.status(200).json({message:err});
  }

});
router.get('/id', async (req, res) => {
  const {id} = req.params;
  try{
    const animals = await  AnimalSchema.find( {  id: 40706 })
    console.log(animals)
    res.json(animals);
  }catch(err){
    res.status(400).json({message:err});
    console.log(animals)
  }

});

module.exports = router;
