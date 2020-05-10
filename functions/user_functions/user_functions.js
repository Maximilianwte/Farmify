// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Firestore

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://farmify-2d43e.firebaseio.com"
  });
}
let db = admin.firestore();

// Passport Google Oauth

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
/* passport.use(new GoogleStrategy({
    clientID: "910532920708-c5j8hmpgh2eev84nqlugs2d4a7mv5ff4.apps.googleusercontent.com",
    clientSecret: "5s8TCD5naYWIRloIbGPqMfDN",
    callbackURL: "http://localhost:8888/"
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return done(err, user);
    });
  }
)); */

// Passport Facebook Oauth

/* FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOrCreate(INSERT_SOMETHING, function (err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
)); */

// Express App
const app = express();
const router = express.Router();

// Firestore Routes

router.get("/", (req, res) => {
  res.send('This route only user related requests.')
})

router.post('/create_user', function (req, res) {
  var data = JSON.parse(req.body)
  let docRef = db.collection('users');
  docRef.add({
    Name: data.Name,
    FamilyName: data.FamilyName,
    Email: data.Email,
    Password: data.Password,
    Country: data.Country,
    Joined: new Date().toDateString()
  }).then(ref => {
    res.send("Send POST worked.")
  });;
})

// Maybe both of the update_userAccess functions must be rewritten to something using a snapshot
// Because I just implemented the .where()s
router.post('/update_userAccess/email', function (req, res) {
  var data = JSON.parse(req.body)
  let docRef = db.collection('users').where('Email', '==', data.ActiveEmail);
  docRef.update({
    Email: data.NewEmail,
  }).then(ref => {
    res.send("Send POST worked.")
  });;
})

// !!! Ah, are these secure? Anybody could send query to the backend with the data.
router.post('/update_userAccess/password', function (req, res) {
  var data = JSON.parse(req.body)
  let docRef = db.collection('users').where('Email', '==', data.Email);
  docRef.update({
    Password: data.Password,
  }).then(ref => {
    res.send("Send POST worked.")
  });;
})

router.post('/update_savedFarms', function (req, res) {
  var data = JSON.parse(req.body)
  let docRef = db.collection('users').where('Email', '==', data.Email);
  docRef.update({
    SavedFarms: data.SavedFarms,
  }).then(ref => {
    res.send("Send POST worked.")
  });;
})

router.post('/update_location', function (req, res) {
  var data = JSON.parse(req.body)
  let docRef = db.collection('users').where('Email', '==', data.Email);
  docRef.update({
    Location: data.Location,
    GeoCode: data.GeoCode
  }).then(ref => {
    res.send("Send POST worked.")
  });;
})

router.post('/read_user', function (req, res) {
  var data = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', data.Email).limit(1);
  docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        var DatabaseData = doc.data();
        if (data.Password == DatabaseData.Password) {
          jwt.sign({
            DatabaseData
          }, 'secretKey', (error, token) => {
            // Check how the DatabaseData looks? Is it next to email etc.?
            DatabaseData["Token"] = token
          })
          DatabaseData = JSON.stringify(DatabaseData);
          res.send(DatabaseData);
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});

// Oauth Routes

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

app.use('/.netlify/functions/user_functions', router);

app.use(cors())

module.exports.handler = serverless(app);

/* function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader != 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

function checkHost(req, res, next) {
  var host = req.get('origin').substring(0,20);
  if (host == "http://localhost:8888/.netlify/functions/user_functions/".substring(0,20)) {
    next();
  } else {
    res.sendStatus(403);
  }
} */