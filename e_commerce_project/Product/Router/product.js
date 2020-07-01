const express = require('express')
const router = express.Router()
const ProductCollection = require('../ProductSchema/productSchema')
const fs = require("fs")
const generator = require('otp-generator')
const path = require('path')
const multer = require('multer')
const BrandCollection = require('../../Brand/BrandSchema/brandschema')
const otp = require('../../OtpGenerate/Generateotp')

//Product product........


var dateObj = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
})

var data1 = new Date()
var date = data1.getDate()
var month = data1.getMonth()
var month1 = month + 1
var year = data1.getFullYear()
var today = date + '-' + month1 + '-' + year


var utc = new Date().toUTCString()
//console.log(utc)

try {

  //if (fs.existsSync(path.join(__dirname+'/uploads/'+today.replace(/\//g,'-')))) 
  //if (fs.existsSync('./uploads/'+today.replace(/\//g,'-')))
  if (fs.existsSync('./ProductPicture/' + today)) {
    console.log("Directory exists.")
  }
  else {
    //fs.mkdirSync(path.join(__dirname+'/uploads/'+today.replace(/\//g,'-')));
    //fs.mkdirSync('./uploads/'+today.replace(/\//g,'-'));
    fs.mkdirSync('./ProductPicture/' + today);
  }
}
catch (e) {
  console.log(e)
}
//console.log(today.replace(/\//g,'-'))
//Math.floor(Date.now()) used for timestamp
//console.log(dateObj.format('mm/dd/yyy'))
const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {

      // cb(null,path.join(__dirname+'/uploads/'+today.replace(/\//g,'-')))
      //cb(null,'./uploads/'+today.replace(/\//g,'-'))
      cb(null, './ProductPicture/' + today)

    },

    filename: function (req, file, cb) {
      console.log("aa11")
      cb(null, 'IMG' + '_' + Math.floor(Date.now()) + '_' + otp() + path.extname(file.originalname))
    }

  })

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    console.log("aa")
    cb(null, true);

  }
  else {
    console.log("dd")
    return cb(new Error(`Please upload an image.`))
    //cb(null, false);
  }
};

const upload = multer(
  {

    storage,
    limits:
    {
      fileSize: 1024 * 1024 * 50
    },
    fileFilter

  })

router.post('/ProductInsert', upload.array('ProductImage',5), async (req, res, next) => {
  try {
    var picArr = []
    
    const allPicture = req.files
    console.log(allPicture)
    console.log("all picture")
  
    if (req.files.length) {
      
      for (let index = 0; index < allPicture.length; index++) {

        picArr[index] = allPicture[index].path
       
      }
    }
    else {
      return res.status(200).send({
        message: 'Please upload a file'
      })
    }
    

console.log("product picture")
    var productData = new ProductCollection({

      ProductImage: picArr,
      ProductName: req.body.ProductName,
      ProductPrice: req.body.ProductPrice,
      BrandId: req.body.BrandId,
      ProductSpecification: req.body.ProductSpecification,
      ProductDescription: req.body.ProductDescription,
      Stock: req.body.Stock
    })
    console.log(productData)
    await productData.save()

    res.status(200).send({
      status:"success",
      message: "Successfully insert the Product!!!",
      productData:productData
    })

  } catch (e) {
    res.status(500).send({
      status:"failed",
      message: "Internal server Error!!",
      e
    })
  }

})


///Show Product with Category

// .populate({ 
//   path: 'pages',
//   populate: {
//     path: 'components',
//     model: 'Component'
//   } 
// })
router.get('/ShowProduct', async (req, res) => {

  try {
    const ProductData = await ProductCollection.find({})
      // .populate('BrandId')
     .populate({         //multiple populate
        path: 'BrandId',
        populate: {
          path: 'Category',
          model: 'CategoryCollection'
        } 
      })
    // .populate('BrandCollection')
      .exec(function (err, Product) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error", err
            }
          )

        }
        else {
          
          res.status(200).send({

            message: "All  product  with Category Show form Database",
            Product
          })
        }
      })

    // res.send(ProductData)
  } catch (e) {
    res.sttatus(500).send({
      message: "Internal Server error!!",
      e
    })
  }
})

//Product search by Brand name............

router.get('/SearchBrandName/:name', async (req, res) => {
  try {
    const brand = req.params.name
    const BrandName = RegExp(brand, 'i')


    const product = await BrandCollection.find({ BrandName: BrandName })
      .populate('product1')
      .exec(function (err, productData) {
        if (err) {
          res.status(500).send({
            message: "internal server error",
            e
          })
        }
        else {
          if (productData == 0) {
            res.status(200).send({
              message: "Does Not Match The data From Database"

            })
          }
          else {
            res.status(200).send({
              message: "Successfully Serach The product From Database ",
              productData
            })
          }
        }
      })


  } catch (e) {
    res.status(500).send({
      message: "Internal server error", e
    })
  }
})

// User Search by Product name...............

router.get('/Search/Product/:name', async (req, res) => {
  try {
    const proName = req.params.name
    const productName = RegExp('.*' + proName + '.*', 'i')
    const product = await ProductCollection.find({ ProductName: productName })
    .populate({         //multiple populate
      path: 'BrandId',
      populate: {
        path: 'Category',
        model: 'CategoryCollection'
      } 
    })
  
    .exec(function (err, Product) {
      if (err) {
        res.status(500).send(
          {
            message: "internal server error", err
          }
        )

      }
      else {
        
        res.status(200).send({

          message: "All  product  with Category Show form Database",
          Product
        })
      }
    
    })
  } catch (e) {
    res.status(500).send({
      message: "Internal server aerror!!",
      e
    })
  }
})

//Product search betwwn  range...........

router.get('/Product/Betweenrange', async (req, res) => {
  const maxRange = parseInt(req.query.h)
  const minRange = parseInt(req.query.l)

  try {

    const product = await ProductCollection.find({ ProductPrice: { $gte: minRange, $lte: maxRange } })

    if (product == 0) {

      res.status(404).send({
        message: "This product not found"
      })

    }
    else {

      res.status(200).send({
        message: "The Products are",
        product
      })
    }

  }
  catch (e) {
    res.status(500).send({
      message: "internal server error",
      e
    })
  }


})

//Product search by range high to low............

router.get('/product/Sort/High_to_low', async (req, res) => {
  try {
    const product = await ProductCollection.find({}).sort({ ProductPrice: -1 })
    res.status(200).send({
      message: "All products are",
      product
    })
  } catch (e) {
    res.status(500).send({
      message: "internal server Error!!",
      e
    })
  }
})


//product serach by range low to high............

router.get('/product/Sort/Low_to_high', async (req, res) => {
  try {
    const product = await ProductCollection.find({}).sort({ ProductPrice: 1 })
    res.status(200).send({
      message: "All products are",
      product
    })
  } catch (e) {
    res.status(500).send({
      message: "internal server Error!!",
      e
    })
  }
})

//user can sort the product name ......... A to z

router.get('/product/Sort/ProductName/AtoZ', async (req, res) => {
  try {
    const product = await ProductCollection.find({}).sort({ ProductName: 1 })
    res.status(200).send({
      message: "All products are",
      product
    })
  } catch (e) {
    res.status(500).send({
      message: "internal server Error!!",
      e
    })
  }
})


//user can search the product  sort z to a

router.get('/product/Sort/ProductName/ZtoA', async (req, res) => {
  try {
    const product = await ProductCollection.find({}).sort({ ProductName: -1 })
    res.status(200).send({
      message: "All products are",
      product
    })
  } catch (e) {
    res.status(500).send({
      message: "internal server Error!!",
      e
    })
  }
})



//delete product ....
router.delete('/DeleteProduct/:id',async(req,res)=>
{
    
    try{
      console.log(req.params.id)
        const deleteProduct=await ProductCollection.find({_id:req.params.id}).remove()
        res.status(200).send({
            message:"Delete Successfully from BrandCollection!!!",
            deleteProduct
        })
    }catch(e)
    {
        res.status(500).send({
            message:"Internal Server Error!!",e
        })
    }
})
module.exports = router