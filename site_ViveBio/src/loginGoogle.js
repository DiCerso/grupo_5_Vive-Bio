const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = "887233456480-n3pb5q5rvjvpkngj0nmvdcgr8c1h6o3l.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback",
    scope: ['profile'], 
    passReqToCallback: true,
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser(function (user, done) {
    
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});