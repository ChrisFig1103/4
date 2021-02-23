let express = require('express');
const { remove } = require('../models/animals');
let router = express.Router();
const AnimalSchema = require('../models/animals');
const UserSchema = require('../models/users');

/* GET users listing. */
router.get('/', async (req, res) => {
  try{
    const users = await UserSchema.find();
    res.json(users);
  }catch(err){
    res.status(200).json({message:err});
  }

});
router.post('/',async (req,res)=>{
  const user = new UserSchema({
      id:req.body.id,
      name:req.body.name,
      age:req.body.age
  });
  try{
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  }catch(err){
    res.status(400).json({message:err});
  }
 
});


router.put('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedUser = await UserSchema.updateOne({id:id});
    res.json(removedUser);
  }catch(err){
    res.json({message:err});
  }
});

router.get('/:id',(req, res) => {
  const {id} = req.params;
  
  UserSchema.find({id:id}).then(user =>{
    const properties = Object.keys(user).map(property => user[property])
    console.log(properties)
    res.json(properties);

  }).catch(function(error) {
    res.send(error);
  });

 


});
 


router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedUser = await UserSchema.remove({id:id});
    res.json(removedUser);
  }catch(err){
    res.json({message:err});
  }

});


 

module.exports = router;
