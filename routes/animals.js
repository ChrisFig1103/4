const express = require('express');
//const data = require('../data/data2.json');
const axios = require('axios');
const AnimalSchema = require('../models/animals');

//const data = AnimalSchema.find();
const router = express.Router();
//let animals = []
//for (let i = 0; i< 10; i++) {
//  animals.push(data[i]);
//}

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
  const animal = AnimalSchema.find({id: 40706})

  const properties = Object.keys(animal).map(property => animal[property])
  console.log(properties)
  res.render('animal', {animalname: animal.animalname, properties, image: url})
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



module.exports = router;

