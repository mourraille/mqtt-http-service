const mqtt = require('mqtt');
const https = require('https');
var nodemailer = require('nodemailer');
var env = require('./env.js');


var client  = mqtt.connect("mqtt://raspberrypi", null);
client.on("connect",function() {	
client.subscribe("mailbox");
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: env.EMAIL,
           pass: env.PASSWORD
       }
   });

   const mailOptions = {
    from:  new Date(), // sender address
    to: env.RECIPIENTS, // list of receivers
    subject: "You've got mail! " // Subject line
    // plain text body
  };


client.on('message',function(topic, message, packet) {
    console.log("You've got mail 📩     ->" + new Date());
    console.log(mailOptions.from);

    mailOptions.html = '<p>\n-> ' + new Date() +'</p>'
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
  //  https.get('', (data) => {
    //})
});



