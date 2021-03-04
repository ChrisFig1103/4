const express = require('express');
const axios = require('axios');
const AnimalSchema = require('../models/animals');
const UserSchema = require('../models/users');
 

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
        
        res.render('animals', { animalsWithImage ,isLoggedIn:Boolean(req.user)});
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

router.get('/adoption/:id',async (req, res) => { 
  const {id} = req.params;
  await AnimalSchema.find({id:id}).then( animal=>{
    const properties = Object.keys(animal).map(property => animal[property]) 
    res.render('adopted', {properties})
  })
})

router.get('/adopted/:id',(req, res) => { 
  const {id} = req.params;
  const {owner} = req.query;
  let owner_name = "";
  
  UserSchema.find({id:owner}).then( user =>{
    owner_name = Object.keys(user).map(property => user[property])
    console.log(owner_name[0].name);
  }).then(()=>{
    AnimalSchema.updateOne({id:id},{$set:{owner:owner_name[0].name}}).then(()=>{
      res.redirect('/animals');
    })
  })
})

module.exports = router;

