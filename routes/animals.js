const express = require('express');
//const data = require('../data/data2.json');
const axios = require('axios');
const AnimalSchema = require('../models/animals');
const UserSchema = require('../models/users');

//const data = AnimalSchema.find();
const router = express.Router();
 

/* GET home page. */
router.get('/', async function(req, res) {
  AnimalSchema.find().then( animals=>{
    const animalsPromises = animals.map(() => {
      return new Promise((resolve, reject) => {
        axios.get('https://api.thecatapi.com/v1/images/search')
        .then(function({data}) {
          const [cat] = data;
          const {url} = cat;
          resolve(url);
        }).catch(function(error) {
          reject(error);
        });
      });
    });

    Promise.all(animalsPromises)
      .then(function(urls) {
        const animalsWithImage = animals.map((animal, index) => ({...animal, image: urls[index]}));     
        
        res.render('animals', { animalsWithImage });
      })
      .catch(function(errors) {
        res.send(`${errors}`)
      });
      
  })
  });

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const {url} = req.query;
  AnimalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property])
    console.log(properties)
    res.render('animal', {animalname: animal.animalname, properties, image: url})
  
  })
});

router.post('/',async (req,res)=>{
  const animal = new AnimalSchema({
      id:req.body.id,
      animalsname:req.body.animalsname,
      breedname:req.body.breedname,
      speciesname:req.body.speciesname,
      animalsage:req.body.animalsage,
      basecolour:req.body.basecolour
  });
  try{
    const savedAnimal = await animal.save();
    res.status(200).json(savedAnimal);
  }catch(err){
    res.status(400).json({message:err});
  }
 
});

router.delete('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedAnimal = await AnimalSchema.remove({id:id});
    res.json(removedAnimal);
  }catch(err){
    res.json({message:err});
  }
});

router.put('/:id',async (req, res) => {
  const {id} = req.params;
  try{
    const removedAnimal = await AnimalSchema.updateOne({id:id});
    res.json(removedAnimal);
  }catch(err){
    res.json({message:err});
  }
});

router.get('/adopted/:id', (req, res) => {

  const {id} = req.params;
  const {url} = req.query;
 
  AnimalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property]) 
    res.render('adopted', {animalname: animal.animalname, properties, image: url})
  
  })
});
router.post('/adoption/:id', async(req, res) => {
  const {id} = req.params;
  const owner = req.query.owner;
  const name_owner=""
  if (req.query){

    UserSchema.find({id:owner}).then(user =>{
    const properties = Object.keys(user).map(property => user[property])
    name_owner = properties[0].name;
    }).catch(function(error) {
      res.send(error);
    });


    await AnimalSchema.updateOne({id:id},{ $set:{owner:name_owner}}).then( _ =>{
      console.log( req.query)
      res.statusCode = 302;
      res.setHeader("Location", "http://localhost:3000/animals");
      res.end(); 
    }) 
  }
});

router.post('/adoption/:id', async(req, res) => {
  const {id} = req.params;
  const owner = req.query.owner;
  let user=userSchema.buscarID(owner);

  UserSchema.statics.buscarID = async (uid) => {
    mongoose.set('debug', true);
  let user = await User.findOne({
      uid,
  });
  console.log(user);
  return user;
  };



  if(!user){
    res.status(401).send("Error");
  }

  AnimalSchema.updateOne({id:id},{ $set:{owner:user.name}}).then( _ =>{
    console.log( req.query)
    res.statusCode = 302;
    res.setHeader("Location", "http://localhost:3000/animals%22");
    res.end(); 

  }) 


});



module.exports = router;

