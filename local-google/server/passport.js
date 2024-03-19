
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const Local=require('./database/model');
const { compareSync } = require('bcrypt');

passport.use(new LocalStrategy(
    function(username, password, done) {
      Local.findOne({ name: username }).then((user)=>{
        //if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!compareSync(password,user.password)) { return done(null, false); }
        return done(null, user);
      })
    }
  ));

  passport.serializeUser((user,done)=>{
    done(null,user.id)
  })
  passport.deserializeUser((id,done)=>{
    Local.findById(id).then((user)=>{
      done(null,user)
  })
    
  })