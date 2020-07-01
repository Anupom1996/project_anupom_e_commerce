const express=require('express')
const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const AdminSchema=mongoose.Schema({
    AdminEmail:
    {
        type:String,
        unique:true
        
    },
    AdminPassword:
    {
        type:String
       
        
    },
    AdminFirstName:
    {
        type:String,
        required:true
    },
    AdminLastName:
    {
        type:String,
        required:true
    },
    AdminPhone:
    {
        type:String,
        required:true
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
},
{
    timestamps : true
})
AdminSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    
    delete userObject.AdminPassword
    delete userObject.tokens
    return userObject
}

//admin password hashCrypted format
AdminSchema.pre('save',async function(callback)
{
  console.log("ii")
    const user = this
    
    if (user.isModified('AdminPassword')) {
        
        user.AdminPassword = await bcrypt.hash(user.AdminPassword, 10)
       
        console.log(user.AdminPassword)
    }
    callback()
})

// AdminSchema.statics.findByCredentials = async (email, password) => {
//     const user = await AdminCollection.findOne({ AdminEmail:email })
// console.log(email,password)
//     if (!user) {
        
//         console.log("User Is Not Correct")
//        // return new Error('user is Not Correct')
//       // return res.send("User is not correct")
        
//     }

//     const isMatch = await bcrypt.compare(password,user.AdminPassword)
    
//     if (!isMatch) {
        
//         console.log("password is not correct")
//        // throw new Error('Password is Not Correct')
//        // return res.send("Password is not correct")
//     }
   
//     return user
// }

AdminSchema.statics.findByCredentials = async (email, password) => {
    const user = await AdminCollection.findOne({ AdminEmail:email })
    var a =true;
    if (!user) {
        // throw new Error('Unable to login Email id is not match')
        // res.status(400).send({
        //     error:'Unable to login Email id is not match'})
        return res.status(400).send("Email do not Exist")
           
    }

    const isMatch = await bcrypt.compare(password, user.AdminPassword)

    if (!isMatch) {
       throw new Error('Unable to login password is not match')
    }
    console.log("user")
    return user
}
AdminSchema.methods.generateAuthToken = async function () {
    const user = this
    
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_KEY,{ expiresIn: '24h' })
    user.tokens = user.tokens.concat({ token })
    console.log(token)
    console.log(user.tokens)
    await user.save()

    return token
}
const AdminCollection=mongoose.model("AdminCollection",AdminSchema)
module.exports=AdminCollection