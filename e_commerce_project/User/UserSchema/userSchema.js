const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const UserRegistrationSchema= new mongoose.Schema({
    UserEmail:
    {
        type:String,
        
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                console.log("email id is not valid")
                throw new Error('Email Is Invalid')
            }
        }
    },
    UserFirstName:
    {
        type:String,
        default:null
        
    },
    UserLastName:
    {
        type:String,
        default:null
        
    },
    UserAddress:
    [{
        type:String,
         default:null
    }],
    PinCode:
    {
        type:Number,
        default:null
    },
    UserPhone:
    {
        type:String,
        
        validate(value)
        {
           
            if(!(/^[789]\d{9}$/).test(value) || (/0{5,}/).test(value) )
            {
                throw new Error("Phone no is Not Valid")
            }
        }

    },
    UserId:
    {
        type:String,
        default:null
    }
    ,
    Otp:
    {
        type:String,
        default:null
    },
    Verify:
    {
        type:Boolean,
        default:false
    },
    OtpGenerateTime:
    {
        type:Date,
        default:null
    }

})

//admin password hashCrypted format
/*UserRegistrationSchema.pre('save',async function(callback)
{
    
    const user = this
    
    if (user.isModified('Password')) {
        
        user.Password = await bcrypt.hash(user.Password, 10)
       
        console.log(user.Password)
    }
    callback()
})*/
UserRegistrationSchema.methods.saveOtp = async function (reqObj) {
  
    const user = this
    
    user.Otp = await bcrypt.hash(reqObj.otpgenerator, 10)
    
    user.OtpGenerateTime = reqObj.OtpGenerateTime
    user.UserId = reqObj.UserId
    await user.save()
}
const UserRegistrationCollection=mongoose.model("UserRegistrationCollection",UserRegistrationSchema)
module.exports=UserRegistrationCollection