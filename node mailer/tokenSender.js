const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken'); 

const transporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'mr.360andvk@gmail.com', 
		pass: 'sqfhnacwkyfocuop' 
	} 
}); 

const token = jwt.sign({ 
		data: 'Token Data'
	}, 'ourSecretKey', { expiresIn: '10m' } 
);	 

const mailConfigurations = { 

	
	from: 'mr.360andvk@gmail.com', 

	to: 'sabarinathan5802@gmail.com', 

	
	subject: 'Email Verification', 
	
	 
	text: `Hi! There, You have recently visited 
		our website and entered your email. 
		Please follow the given link to verify your email 
		http://localhost:3000/verify/${token} 
		Thanks` 
	
}; 

transporter.sendMail(mailConfigurations, function(error, info){ 
	if (error) throw Error(error); 
	console.log('Email Sent Successfully'); 
	console.log(info); 
}); 
