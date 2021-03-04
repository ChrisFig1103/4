const express = require('express');
const passport = require('passport');
 
const router = express.Router();
 
router.get('/login', async function(req, res) {
    res.render('login' );
});


router.get('/logout',(req, res)=> {
    req.logout();
    req.session=null;
    res.redirect('/auth/login');
});
 
router.get('/google', passport.authenticate('google', 
    { scope: ['profile', 'email'] })
); 
 
router.get('/google/callback',
    passport.authenticate('google',{failureRedirect:'/login'}),
    function(req,res){
        // print req.query.code 
        console.log(req.user);
        // Successful authentication, redirect home. 
        res.redirect('/profile' );
    }
)

 
module.exports = router;

