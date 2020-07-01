const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
function UserEmailSent(email, otp) {
   
    console.log(email, otp)
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.emailid,
            pass: process.env.password
        }
    }))




   
    let mailoption = {
        from: 'anupom262015@gmail.com',
        to: email,
        subject: 'VERIFY OTP',
        text: `Your One Time Password(OTP) Is ${otp} `,


    }
    
    transporter.sendMail(mailoption, function (err, data) {
        
        if (err) {
            console.log('error occure', err)
        }
        else {
            console.log('email sent')
        }
    })
}
module.exports = UserEmailSent