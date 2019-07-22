const mqtt = require('mqtt');
const https = require('https');
var nodemailer = require('nodemailer');

var client  = mqtt.connect("mqtt://raspberrypi", null);
client.on("connect",function() {	
client.subscribe("mailbox");
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'mauricio.mourraille@ucrso.info',
           pass: ''
       }
   });

   const mailOptions = {
    from: 'mauricio.mourraille@ucrso.info', // sender address
    to: 'mourraille@me.com,knajjars@gmail.com', // list of receivers
    subject: "You've got mail! ", // Subject line
    html: '<p>You' +'\'ve got mail 📩 !    -> ' + new Date() +'</p>'// plain text body
  };

client.on('message',function(topic, message, packet) {
    console.log("You've got mail 📩     ->" + new Date());

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
  //  https.get('', (data) => {
    //})
});



