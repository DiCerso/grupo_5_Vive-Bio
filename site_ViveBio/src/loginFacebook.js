const passport = require('passport');

const facebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_CLIENT_ID = "764716957908988";
const FACEBOOK_CLIENT_SECRET = "0821ea474e1f0c95ed270032e5869e4a";



passport.use(new facebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, user);
});
