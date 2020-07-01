const mongoose = require('mongoose')
const validator=require('validator')
const ProductSchema= mongoose.Schema({
ProductName:
{
    type:String,
    required:true,
    unique:true
    
},
ProductPrice:
{
    type:Number,
    required:true
    
},
BrandId:
[
    {
      
        type:mongoose.Schema.Types.ObjectId,
    ref:'BrandCollection',
    required:true
     
    }
],
   ProductImage:
   [{
       type:String
       
       
   }],
  
   ProductSpecification:
   {
       type:String,
       default:null
   },
   ProductDescription:
   {
       type:String,
       default:null
   },
    CreatedAt:
   {
       type:Date,
       default:Date.now()
   },
   Stock:
   {
       type:Number,
       required:true
   },
   Available:
   {
       type:Boolean,
       default:false
   }

})
const ProductCollection=mongoose.model('ProductCollection',ProductSchema)
module.exports=ProductCollection