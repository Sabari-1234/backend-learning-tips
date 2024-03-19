const express = require('express');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const app = express();


app.use(express.urlencoded({ extended: false }));

// Create a secret for TOTP (Time-Based One-Time Password)
const secret = speakeasy.generateSecret({ length: 20 });

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  
  service: 'gmail', 
	auth: { 
		user: 'mr.360andvk@gmail.com', 
		pass: 'sqfhnacwkyfocuop' 
	} 
});

// Generate and send an OTP via email

app.get('/send-otp',(req,res)=>{
res.sendFile(__dirname+'/send.html')
})
app.post('/send-otp', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  const mailOptions = {
    from: 'mr.360andvk@gmail.com',
    to: email,
    subject: 'One-Time Password (OTP)',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending OTP via email');
    } else {
      console.log('OTP sent via email: ' + info.response);
      res.status(200).send('OTP sent successfully.');
    }
  });
});

// Verify the OTP
app.get('/verify-otp',(req,res)=>{
  res.sendFile(__dirname+'/verify.html')
  })
app.post('/verify-otp', (req, res) => {
  const otp = req.body.otp;

  if (!otp) {
    return res.status(400).send('OTP is required.');
  }

  const otpVerification = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: 'base32',
    token: otp,
    window:1
  });
console.log(otpVerification)
  if (otpVerification) {
    res.status(200).send('OTP is valid.');
  } else {
    res.status(400).send('OTP is invalid.');
  }
});

app.listen(80, () => {
  console.log(`Server is running on port 80`);
});
