const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const UserGoogleSchema = require('../models/usersGoogle');


 
passport.serializeUser(function(user,done){
  done(null,user );
})

passport.deserializeUser(function(user,done){
  UserGoogleSchema.find({id:user.id}).then( user =>{
    done(null, user)
  })
 
})

passport.use( 
  new GoogleStrategy( 
    { 
      clientID: process.env.CLIENT_ID,      
      clientSecret: process.env.CLIENT_SECRET,      
      callbackURL: 'http://localhost:3000/auth/google/callback', 
    }, 
    async (accessToken, refreshToken, profile,email, done) =>{ 
      const newUser = {
        googleId: email.id,
        displayName: email.displayName,
        firstName: email.name.givenName,
        lastName: email.name.familyName,
        email:email.emails[0].value,
        image:email.photos[0].value
      }
      try{
          let user = await UserGoogleSchema.findOne({id:profile.id})
          if(user){
            done(null,user);
          }else{
            user = UserGoogleSchema.create(newUser).then(()=>{
              done(null,newUser);
            });
          }
        }catch(err){
          console.log(err);
        }
      }     
    ) 
  ); 


