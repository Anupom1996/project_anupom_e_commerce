const otpgenerate=require('otp-generator')
require('dotenv').config()
const speakeasy=require('speakeasy')
function Otp()
{
   const otp = otpgenerate.generate(5,{upperCase:false,alphabets:false,specialChars:false})
    console.log(otp)
  
   
       
      //  console.log(otp) 
        return otp.toString()

    
}
module.exports=Otp