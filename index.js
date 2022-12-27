const express = require('express');

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const app = express();
require('dotenv').config();

let mailList = [
  { email: 'lara123@gmail.com', day: 1, mail: 0, date: "2022-12-26" },
  { email: 'sola321@gmail.com', day: 2, mail: 1, date: "2022-12-27" },
  { email: 'gmail321@gmail.com', day: 3, mail: 1, date: "2022-12-27"},
]

let mailTrans = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'priscilla12@ethereal.email',
    pass: '3QVg7fRNej7V8paDhP'
  }
});

cron.schedule("*/5 * * * * *", () => {
  var date_ob = new Date();
  var day = ("0" + date_ob.getDate()).slice(-2);
  var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  var year = date_ob.getFullYear();

  var date = year + "-" + month + "-" + day;

  var hours = date_ob.getHours();
  var ampm = hours >= 12 ? 'pm' : 'am';
  var hoursampm = date_ob.getHours() + ampm;
  var minutes = date_ob.getMinutes();
  var seconds = date_ob.getSeconds();

  var dateTime = hours + ":" + minutes + ":" + seconds;

  mailList.forEach((mail) => {
    if((mail.day == 2 && mail.mail == 0 && hoursampm == '12pm') || 
    (mail.day == 5 && mail.mail == 1 && hoursampm == '9am') || 
    (mail.day == 7 && mail.mail == 2 && hoursampm == '9am')) {
      var mailOptions = {
        from: "priscilla12@ethereal.email",
        to: mail.email,
        subject: 'Sending Email using Node.js',
        text: `Hi today is ${date} And ${dateTime}`
      };
      mailTrans.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      mail.mail = mail.mail + 1;
    }

    if (mail.date < date) {
      mail.date = date;
      mail.day = mail.day + 1;
      
    }
    // console.log(mail.day);
    // if (mail.day == 5 && !mail.mail) {
    //   var mailOptions = {
    //     from: "priscilla12@ethereal.email",
    //     to: mail.email,
    //     subject: 'Sending Email using Node.js',
    //     text: 'Hi today is &lt;date&gt; And &lt;time&gt'
    //   };
    // }

    // if (mail.day == 7 && !mail.mail) {
    //   var mailOptions = {
    //     from: "priscilla12@ethereal.email",
    //     to: mail.email,
    //     subject: 'Sending Email using Node.js',
    //     text: 'Hi today is &lt;date&gt; And &lt;time&gt'
    //   };
    // }
  })
})

app.listen(5000, () => {
  console.log(process.env.Name);
})