// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");

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
  var inFile = JSON.parse(req.body)
  let docRef = db.collection('users').where('Email', '==', inFile.Email).limit(1);
  docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        let docRef2 = db.collection('users');

        docRef2.add({
          Name: inFile.Name,
          FamilyName: inFile.FamilyName,
          Email: inFile.Email,
          Password: inFile.Password,
          Country: inFile.Country,
          Joined: new Date().toDateString()
        }).then(ref => {
          res.sendStatus(200);
        })
      }
      snapshot.forEach(doc => {
        res.sendStatus(406)
      });
    })
    .catch(err => {
      res.send(err)
    });
})

router.post('/read_user', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', inFile.Email).limit(1);
  docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        var data = doc.data();
        if (inFile.Password == data.Password) {
          data = JSON.stringify(data);
          res.send(data);
        }
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});

router.post('/update_profile', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', data.Email).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
      db.collection('users').doc(doc.id).update(inFile).then(function () {
        res.sendStatus(200);
      }).catch(err => {
        res.sendStatus(404);
      });
    });
  })
})

router.post('/update_userAccess/email', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', inFile.ActiveEmail).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('users').doc(doc.id).update({
        Email: inFile.NewEmail
      }).then(function () {
        res.send('Email succesfully updated.');
      }).catch(err => {
        res.send('No fitting email found.');
      });
    });
  })
})

router.post('/update_userAccess/password', function (req, res) {
  var inFile = JSON.parse(req.body);
  let docRef = db.collection('users').where('Email', '==', inFile.Email).where('Password', '==', inFile.ActivePassword).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('users').doc(doc.id).update({
        Password: inFile.NewPassword
      }).then(function () {
        res.send('Password succesfully updated.');
      }).catch(err => {
        res.send('No fitting password found.');
      });
    });
  })
})

router.post('/generate_redeem', function (req, res) {
  var inFile = JSON.parse(req.body)
  let docRef = db.collection('groupCodes');

  var responseData = {
    Codes: new Array
  }

  function createCode(inFile) {
    return new Promise((resolve, reject) => {
      var Code = `${inFile.FamilyName[0]}${parseInt(Math.random()*1000)}${inFile.Name[0]}${Math.random().toString(36).substring(5)}${parseInt(Math.random()*1000)}`;
      docRef.add({
        Name: `${inFile.Name} ${inFile.FamilyName}`,
        Email: inFile.Email,
        AmountBatched: inFile.Amount,
        Created: new Date().toDateString(),
        Code: Code
      }).then(ref => {
        resolve(Code)
      }).catch(error => {
        console.log(error)
      })
    })
  }

  // Der Loop könnte mir so um die Ohren fliegen!
  while (true) {
    setTimeout(function() {
      if (responseData.Codes.length < inFile.Amount - 1) {
        createCode(inFile).then(code => {responseData.Codes.push(code)})
      }
      else {
        break;
      }
    }, 500)
  }

  // maybe i have to convert the forloop into a promise
  res.send(responseData);
})

router.post('/redeem', function (req, res) {
  var inFile = JSON.parse(req.body)
  let docRef = db.collection('groupCodes').where('Code', '==', inFile.Code).limit(1);
  docRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      db.collection('groupCodes').doc(doc.id).delete().then(function () {
        res.sendStatus(200);
      }).catch(err => {
        res.sendStatus(404);
      });
    });
  })
})

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

module.exports.handler = serverless(app);