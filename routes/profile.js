const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    const user = req.user[0]
    res.render('profile',{ image:user.image,name:user.displayName,email:user.email ,isLoggedIn:Boolean(req.user)});
});

module.exports = router;

