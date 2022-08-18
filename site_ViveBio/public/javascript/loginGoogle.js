const passport = require('passport')
const db = require('../../src/database/models')

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID = "887233456480-n3pb5q5rvjvpkngj0nmvdcgr8c1h6o3l.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


let signInGoogle = async function (email){
    return console.log(email)
    let sign = await fetch('/api/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
}


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3030/auth/google/callback",
    scope: ['profile'],
    passReqToCallback: true,
},
    function (request, accessToken, refreshToken, profile, done) {
        signInGoogle(profile.email)
        return done(null, profile);
    }));

passport.serializeUser(function (user, done) {
    
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});