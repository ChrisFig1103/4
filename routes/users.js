let express = require('express');
const { remove } = require('../models/animals');
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
router.get('/:id',async (req, res) => {
  const {id} = req.params;
  const {url} = req.query;
  AnimalSchema.find({id:id}).then( animal=>{
    const id = animal._id
    console.log(id)
  })

});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedPost = await AnimalSchema.remove({id:id});
    res.json(removedPost);
  }catch(err){
    res.json({message:err});
  }

});
module.exports = router;
