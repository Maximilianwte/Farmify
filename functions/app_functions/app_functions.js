// https://jackwhiting.co.uk/posts/using-firebase-admin-sdk-with-netlify-lambda-functions/
const express = require("express");
const serverless = require("serverless-http");

// Express
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send('This route only app related requests.')
})

app.use('/.netlify/functions/app_functions', router);

app.use(cors({
  origin: 'https://farmify.netlify.app'
}));

module.exports.handler = serverless(app);