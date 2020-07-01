const mongoose =require('mongoose')
const moment=require('moment')
const CategorySchema=new mongoose.Schema({
    CategoryName:
    {
        type:String,
        reuired:true,
        unique:true

    },
    CreatedAt:
    {
        type:Date,
        default:Date.now()
    },
    CategoryBrands:[
        {
          
            type:mongoose.Schema.Types.ObjectId,
        ref:'BrandCollection',
        required:true
         
        }
    ],
    CategoryImage:
    {
        type:String,
        required:true
    },
    CategoryDescription:
    {
        type:String,
       // required:true
    }

})
CategorySchema.virtual('products', {
    ref: 'ProductCollection',             // The model to use
    localField: 'CategoryBrands._id',                      // Find people where `localField`
    foreignField: 'BrandId',             // is equal to `foreignField`
                                 // If `justOne` is true, 'members' will be a single doc as opposed to
                                // an array. `justOne` is false by default.
    justOne: false,
 //options: { sort: { Name: -1 }, limit: 1 } // Query options, see http://bit.ly/mongoose-query-options
  })
  CategorySchema.set('toObject', { virtuals: true })
  CategorySchema.set('toJSON', { virtuals: true })


const CategoryCollection=mongoose.model('CategoryCollection',CategorySchema)
module.exports=CategoryCollection