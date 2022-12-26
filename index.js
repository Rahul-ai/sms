const express = require('express');

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const app = express();
require('dotenv').config();

let mailList = [
  {email:'lara123@gmail.com'},
  {email:'sola321@gmail.com'},
  {email:'gmail321@gmail.com'}
]

let mailTrans = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'priscilla12@ethereal.email',
    pass: '3QVg7fRNej7V8paDhP'
  }
});

cron.schedule("*/12 * * * * *",()=>{
   mailList.forEach((mail)=>{ 
  var mailOptions = {
    from: "priscilla12@ethereal.email",
    to: mail.email,
    subject: 'Sending Email using Node.js',
    text: 'Greeting!!!'
  };
mailTrans.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
})
})
})

app.listen(5000,()=>{
    console.log(process.env.Name);
})