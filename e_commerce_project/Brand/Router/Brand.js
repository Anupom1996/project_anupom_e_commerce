const express = require('express')
const BrandCollection=require('../BrandSchema/brandschema')
const router=express.Router()

// Brand Data Insert .......

router.post('/BrandInsert',async(req,res)=>
{
   
    try{
       
        const brandReqBody=await BrandCollection(req.body)
        
        console.log(brandReqBody)
        await brandReqBody.save()
        res.status(200).send({
            message:"You Successfully Insert The Brand",
            brandReqBody
        })
    }catch(e)
    {
        res.status(200).send({
        message:"Internal server error!!!",
            e
        })
    }
})

//only Brand show .........

router.get('/ShowBrand',async(req,res)=>
{
    try{
        const allBrand=await BrandCollection.find({})
      
        res.status(200).send({
            message:"All Brands Are",
            allBrand
        })
       
       
    }catch(e)
    {
        res.status(500).send({
            message:"Internal server Error",
            e
        })
    }
})

///show brands with Product.......

router.get('/ShowBrand/Product',async(req,res)=>
{
    try{
        const allBrand=await BrandCollection.find({})
        .populate('product1')
        .exec(function (err, BrandData) {
            if (err) {
                res.status(500).send(
                    {
                        message: "internal server error"
                    }
                )

            }
            else {
              res.status(200).send({
                message:"All Brands with product Are!!!",
                BrandData
              })
            }
        })
        
       
       
    }catch(e)
    {
        res.status(500).send({
            message:"Internal server Error",
            e
        })
    }
})

//update the Brand......


router.put('/UpadteBrand/:id',async(req,res)=>
{
    const reqBody=Object.keys(req.body)
    console.log(reqBody)
    const updates={}
    for(let index=0;index<reqBody.length;index++)
    {
        updates[reqBody[index]]=Object.values(req.body)[index]
    }
    try{
        const updateBrand=await BrandCollection.updateOne({_id:req.params.id},{$set:updates})
        res.status(200).send({
            message:"Updates the Brand!!!",
            updateBrand
        })
    }catch(e)
    {
        res.status(500).send({
            message:"internal server error!!",
            e
        })
    }
})


//delete the Brand....................

router.delete('/DeleteBrand/:name',async(req,res)=>
{
    
    try{
        const deleteBrand=await BrandCollection.find({BrandName:req.params.name}).remove()
        res.status(200).send({
            message:"Delete Successfully from BrandCollection!!!",
            deleteBrand
        })
    }catch(e)
    {
        res.status(500).send({
            message:"Internal Server Error!!",e
        })
    }
})

router.get('/SearchBrand/:name', async (req, res) => {
    try {
      const catName = req.params.name
      const brandName = RegExp(catName, 'i')
      const brandData = await BrandCollection.find({ BrandName: brandName })
      
        //.populate('CategoryBrands')
        // .populate('products')
       res.status(200).send({
           message:"successfully serach the brand",brandData
       })
    } catch (e) {
      res.status(500).send({
        message: "internal Server Error!!",
        e
      })
    }
  })
module.exports=router