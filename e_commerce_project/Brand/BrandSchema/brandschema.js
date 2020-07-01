const mongoose =require('mongoose')
const BrandSchema=new mongoose.Schema({
    BrandName:
    {
        type:String,
        reuired:true,
        unique:true

    },
    
   
    CreatedAt:
    {
        type:Date,
        default:Date.now()
    }

})
BrandSchema.virtual('Category', {
    ref: 'CategoryCollection',             // The model to use
    localField: '_id',                      // Find people where `localField`
    foreignField: 'CategoryBrands',             // is equal to `foreignField`
                                 // If `justOne` is true, 'members' will be a single doc as opposed to
                                // an array. `justOne` is false by default.
    justOne: false,
 //options: { sort: { Name: -1 }, limit: 1 } // Query options, see http://bit.ly/mongoose-query-options
  })

  BrandSchema.set('toObject', { virtuals: true })
  BrandSchema.set('toJSON', { virtuals: true })
const BrandCollection=mongoose.model('BrandCollection',BrandSchema)
module.exports=BrandCollection