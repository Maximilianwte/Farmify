// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");
const cors = require('cors');
const jwt = require('jsonwebtoken');

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://farmify-2d43e.firebaseio.com"
  });
}
let db = admin.firestore();

// Express
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send('This route only farm related requests.')
})

router.get('/read_allGroups', function (req, res) {
  let docRef = db.collection('groups');
  docRef.get().then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      // hope making a new array and pushing data works.
      var DatabaseData = new Array();
      snapshot.forEach(doc => {
        DatabaseData.push(doc.data());
      });
      DatabaseData = JSON.stringify(DatabaseData);
      res.send(DatabaseData);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});


// JWT EXAMPLE

/* router.get('/read_allGroups', verifyToken, function (req, res) {
  jwt.verify(req.token, 'secretkey', (error, data) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let docRef = db.collection('groups');
      docRef.get().then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          // hope making a new array and pushing data works.
          var DatabaseData = new Array();
          snapshot.forEach(doc => {
            DatabaseData.push(doc.data());
          });
          DatabaseData = JSON.stringify(DatabaseData);
          res.send(DatabaseData);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
  });
}); */

app.use('/.netlify/functions/farm_functions', router);

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
  var host = req.get('origin');
  if (host == "http://localhost:8888/.netlify/functions/user_functions/") {
    next();
  } else {
    res.sendStatus(403);
  } */