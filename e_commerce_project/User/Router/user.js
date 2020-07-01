const express = require('express');
const router = express.Router();
const UserRegistrationCollection = require('../UserSchema/userSchema');
const UserEmailSent = require('../../SentMailByUser/SentMail');
const Otp = require('../../OtpGenerate/Generateotp');
const auth=require('../../Middleware_project/auth')
const bcrypt = require('bcrypt')

router.post('/userRegistration', async (req, res) => {
    
    try {
        const userRegBody = await UserRegistrationCollection(req.body);
    console.log(userRegBody);
    console.log(req.body.UserEmail)
        const emailExist = await UserRegistrationCollection.findOne({ UserEmail: req.body.UserEmail })
        if (!emailExist) {

            const body = await userRegBody.save();
            const otpgenerator = Otp();
            //new user create..........
            var string='User'
            
            const newUserId=string+otpgenerator
            console.log(newUserId)
            console.log(req.body.UserEmail)
            UserEmailSent(req.body.UserEmail, otpgenerator);

          //Time generate of otp.........  and save to database
            const Time = new Date((new Date()).getTime())
            await userRegBody.saveOtp({
                otpgenerator: otpgenerator,
                OtpGenerateTime: Time,
                UserId:newUserId


            })
            res.status(200).send({
                message: "You Are a New Register.",
                body
            })


        }
        else {
            const otpgenerator = Otp();
            const Time = new Date((new Date()).getTime())
            const newotp = await bcrypt.hash(otpgenerator, 10)
            UserEmailSent(req.body.UserEmail, otpgenerator);
            const body = await UserRegistrationCollection.updateOne({ UserEmail: req.body.UserEmail }, { $set: { Verify: false, Otp: newotp, OtpGenerateTime: Time } })
            res.status(200).send({
                message: "You are a Old User,And Update Your Profile",
                body

            })

        }




    } catch (e) {

        res.status(500).send(e)
    }

})
router.post('/otpverification', async (req, res) => {

    try {
        const verificationEmail = req.body.UserEmail
        const verificationOtp = req.body.Otp
        console.log(verificationEmail, verificationOtp)
        const user = await UserRegistrationCollection.findOne({ UserEmail: verificationEmail })

        if (!user) {
            console.log("emailid not match")
            return res.status(401).send({
                message: "Email id does not Match"
            })

        }

        //otp expire code...........
        const newTime = new Date()


        const beforeTime = user.OtpGenerateTime

        const sec = parseInt(newTime.getTime() - beforeTime.getTime()) / 1000;
        console.log(sec)

        const totalSeconds = sec.toFixed(0)


        console.log(totalSeconds)

        if (totalSeconds <= 30) {
            const otpMatch = await bcrypt.compare(verificationOtp, user.Otp)
            if (!otpMatch) {
                console.log("otp does not match")

                return res.status(401).send({
                    message: "otp does not match"
                })
            }


            user.Otp = null,
                user.Verify = true
            user.OtpGenerateTime = null
            await user.save()

            res.status(200).send({
                message: " Your OTP Verify Successfully!!!!",

            })
        }
        else {
            res.status(401).send({
                message: "Otp Expired.plz Resend Otp"
            })
        }
    } catch (e) {
        res.status(500).send({
            message: "internal server error", e
        })
    }
})
router.get('/checkprofile/:UserId', async (req, res) => {
    const actualUser = await UserRegistrationCollection.findOne({ UserId:req.params.UserId })
    if (!actualUser) {
        res.send("Invalid User")
    }
    else {
        if (UserRegistrationCollection.UserFirstName != null) {

            if (UserRegistrationCollection.UserLastName != null) {
               
                    if (UserRegistrationCollection.PinCode != null) {
                        if (UserRegistrationCollection.UserPhone != null) {
                            res.send({ message: "complete profile" })

                        }
                        else {
                            res.send("inomplete lphone nuber")
                        }

                    }
                    else {
                        res.send("inomplete Pincode")
                    }

                }
                
            else {
                res.send("inomplete last name")
            }
        }
        else {
            res.send("inomplete first name")

        }
    }

})


////User update profile
router.patch('/userDetailsUpdate', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['UserFirstName', ' UserLastName', 'UserAddress', 'PinCode','UserPhone']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//ShowUser.....

router.get('/ShowUserListing',auth,async(req,res)=>
{
    try{
        const allUser=await UserRegistrationCollection.find({})
        res.status(200).send({
            message:"All user",
            allUser
        })
    }catch(e)
    {
        res.status(500).send({
            message:"Internal Server error",
            e
        })
    }
})
module.exports = router