const nodemailer = require("nodemailer");
const otp = require("../utils/otp.util.js");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter.verify((error,success)=>{
    if(error){
        console.log("Email is redy to send",error)
    } else {
        console.log("Email sever is some went wrong")
    }
})


const recive = async (to,html)=>{

    try {

        const info = {
        from:"guptaanant382@gmail.com",
        to:to,
        subject:"You are register this is your otp",
        html:html
      }

        const response = await transporter.sendMail(info);

       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log("Some went wrong in this set",error)
        
    }
}

module.exports = recive

