const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const Local = require("./database/model");

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "http://localhost/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, profile);
      Local.findOne({ googleId: profile.id }).then((user) => {
        if (!user) {
          const newUser = new Local({
            name: profile.displayName,
            googleId: profile.id,
          });
          newUser.save();
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  Local.findById(id).then((user) => {
    done(null, user);
  });
});
