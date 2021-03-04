const express = require('express');
const axios = require('axios');
const authRouter = require('./auth'); 
require('dotenv').config();
 

const router = express.Router();
 
router.get('/', async function(req, res) {
    res.redirect('/animals');
});

module.exports = router;

