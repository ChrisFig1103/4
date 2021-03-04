const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    res.render('profile',{user:req.user,isLoggedIn:Boolean(req.user)});
});

module.exports = router;

