const express = require("express");
const serverless = require("serverless-http");

// Express
const app = express();
const router = express.Router();

var nodemailer = require('nodemailer');

// Also remember when you put that in a function to make it ajax conform again

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lightstrategies@gmail.com',
    pass: 'pushing40inthe?zone'
  }
});

/* var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5dd0d2010ebc38",
    pass: "03c47dd456f3a6"
  }
}); */

// Routes

router.get("/", (req, res) => {
  res.send('This route only app related requests.')
})

router.get("/send_mail", (req, res) => {
  var data = {
    Name: "Karin",
    FamilyName: "Hubert",
    Email: "Karin.Backpack@outlook.de",
    Country: "Austria",
    FarmName: "Tims Apple Farm",
    FarmMail: "maximilianwitte@outlook.de"
  }

  var mailOptions = {
    from: `"${data.Name} ${data.FamilyName}" <${data.Email}>`,
    to: data.FarmMail,
    subject: 'Application for working at your Farm.',
    text: `Dear sir or madam, I am really interested in working at your farm. My name is ${data.Name} ${data.FamilyName}. I would really like to work at your place! Best regards, ${data.Name}`,
    html: `Dear sir or madam,<br><br> I am really interested in working at your farm. My name is ${data.Name} ${data.FamilyName}.<br> I would really like to work at your place!<br><br> Best regards,<br> ${data.Name}`
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.send("Done")
  });
})

app.use('/.netlify/functions/app_functions', router);

module.exports.handler = serverless(app);