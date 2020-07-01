const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const CategoryCollection = require('../CategorySchema/categorySchema')
const fs = require("fs")
const generator = require('otp-generator')
const path = require('path')
const multer = require('multer')
const BrandCollection = require('../../Brand/BrandSchema/brandschema')
const validIdOrNot = require('../CategoryValidation/validcategory')

//insert product........


var dateObj = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
})

var data1 = new Date()
var date = data1.getDate()
var month = data1.getMonth()
var month1 = month + 1
var year = data1.getFullYear()
//console.log(date)
//console.log(month1)
//console.log(year)

//var today =  dateObj.slice(0,9);
var today = date + '-' + month1 + '-' + year

//console.log(dateObj)
//console.log(today)
var utc = new Date().toUTCString()

//console.log(data1)
//console.log(utc)

//require('./uploads')
const otp = generator.generate(4, { alphabets: false, upperCase: false, specialChars: false })
const timestamp = Math.floor(Date.now())
//console.log(timestamp)
try {

  //if (fs.existsSync(path.join(__dirname+'/uploads/'+today.replace(/\//g,'-')))) 
  //if (fs.existsSync('./uploads/'+today.replace(/\//g,'-')))
  if (fs.existsSync('./CategoryPicture/' + today)) {
    console.log("Directory exists.")
  }
  else {
    //fs.mkdirSync(path.join(__dirname+'/uploads/'+today.replace(/\//g,'-')));
    //fs.mkdirSync('./uploads/'+today.replace(/\//g,'-'));
    fs.mkdirSync('./CategoryPicture/' + today);
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
      cb(null, './CategoryPicture/' + today)

    },

    filename: function (req, file, cb) {
      var extensionName = file.originalname.split('.')
      cb(null, 'IMG' + '_' + timestamp + '_' + otp + '.' + extensionName[1])
    }

  })

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {

    cb(null, true);

  }
  else {

    cb(null, false);
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

router.post('/CategoryInsert', upload.single('CategoryImage'), async (req, res, next) => {
  try {
    
    if (!req.file)
      return res.status(200).send({
        message: 'Please upload a file'
      })

    var categoryData = new CategoryCollection({

      CategoryImage: req.file.path,
      CategoryName: req.body.CategoryName,
      CategoryBrands: req.body.CategoryBrands,
      CategoryDescription: req.body.CategoryDescription
    })
    console.log(req.body.CatBrands);
    console.log(req.body.CategoryBrands);
    console.log(categoryData)
    console.log(categoryData.CategoryBrands)
     await categoryData.save()
console.log("asdfghjkl")
    res.status(200).send({
      status:"success",
      message: "Successfully insert the Categoty!!!",
      categoryData:categoryData
    })

  } catch (e) {
    res.status(500).send({
      status:"failed",
      message: "Internal server Error!!",
      e
    })
  }

})



//....Category Data show...........

router.get('/ShowCategory', async (req, res) => {
  try {
    const categoryData = await CategoryCollection.find({})
      .populate('CategoryBrands')
      // .populate('products')

      .exec(function (err, categoryData) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error"
            }
          )

        }
        else {
          res.status(200).send({
            message: "All Category Data Are!!!",
            categoryData
          })
        }
      })



  } catch (e) {
    res.status(500).send({
      message: "Internal Server Error",
      e
    })
  }
})

//Category update ............
router.put('/UpdateCategory/:name', async (req, res) => {
  try {
    console.log(req.params.name)
    const reqBody = Object.keys(req.body)
    console.log(reqBody)
    const updates = {}
    for (let index = 0; index < reqBody.length; index++) {
      updates[reqBody[index]] = Object.values(req.body)[index]
    }
    console.log(updates)
    const updateCategory = await CategoryCollection.updateOne({ CategoryName: req.params.name }, { $set: updates }, function (err, result) {
      if (err) {
        res.status(500).send(err)
      }
      else {
        res.status(200).send({
          message: "Updates the category!!!",
          result
        })
      }
    })

  } catch (e) {
    res.status(500).send({
      message: "Internal server error!!!",
      e
    })
  }
})

// show category with brand..........

router.get('/Category/Brand', async (req, res) => {
  try {
    const category = await CategoryCollection.find({})
      .populate('CategoryBrands')
      .exec(function (err, categoryData) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error", err
            }
          )

        }
        else {
          console.log("aaa")
          res.status(200).send({

            message: "All  category  with Brands Show form Database",
            categoryData
          })
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "internal server error!!!",
      e
    })
  }
})

router.get('/Category/Product', async (req, res) => {
  try {
    const category = await CategoryCollection.find({})
      .populate('products')
      .exec(function (err, categoryData) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error", err
            }
          )

        }
        else {
          console.log("aaa")
          res.status(200).send({

            message: "All  category  with products Show form Database",
            categoryData
          })
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "internal server error!!!",
      e
    })
  }
  
})

// user can search the Category by their Name...............
router.get('/Search/category/:name', async (req, res) => {
  try {
    const catName = req.params.name
    const categoryName = RegExp(catName, 'i')
    const categoryData = await CategoryCollection.find({ CategoryName: categoryName })
    // .select({ '_id': 0, 'CreatedAt': 0, '__v': 0 })
      //.populate('CategoryBrands')
      // .populate('products')
      .populate({
        path: 'products',
        model: 'ProductCollection',
        select: { '_id': 0, '_v': 0, 'Available': 0, 'CreatedAt': 0 }

      })

      .exec(function (err, categoryData) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error"
            }
          )

        }
        else {
          if (categoryData == 0) {
            res.status(404).send(
              {
                message: "Data are not found in the Database!!"
              }
            )
          }
          else {

            res.status(200).send({
              message: "All Category Data Are!!!",
              categoryData
            })
          }
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "internal Server Error!!",
      e
    })
  }
})


//only category search....

router.get('/categorySearch/:name', async (req, res) => {
  try {
    const catName = req.params.name
    const categoryName = RegExp(catName, 'i')
    const categoryData = await CategoryCollection.find({ CategoryName: categoryName })
    .populate('CategoryBrands')
    // .select({ '_id': 0, 'CreatedAt': 0, '__v': 0 })
      //.populate('CategoryBrands')
      // .populate('products')
      // .populate({
      //   path: 'products',
      //   model: 'ProductCollection',
      //   select: { '_id': 0, '_v': 0, 'Available': 0, 'CreatedAt': 0 }

      

      .exec(function (err, categoryData) {
        if (err) {
          res.status(500).send(
            {
              message: "internal server error"
            }
          )

        }
        else {
          if (categoryData == 0) {
            res.status(404).send(
              {
                message: "Data are not found in the Database!!"
              }
            )
          }
          else {

            res.status(200).send({
              message: "All Category Data Are!!!",
              categoryData
            })
          }
        }
      })
  } catch (e) {
    res.status(500).send({
      message: "internal Server Error!!",
      e
    })
  }
})


//Category Update .........



router.patch("/CategoryUpdate/:Id", upload.single('picture1'), (req, res, next) => {
  // // Validate Request
  // if(!req.params.userId) {
  //     return res.status(400).send({
  //         message: "This id does not exist"
  //     });
  // }

  
  // Find note and update it with the request body
  CategoryCollection.findByIdAndUpdate(req.params.Id, {
    CategoryName: req.body.CategoryName,
    CategoryBrands: req.body.CategoryBrands,
    CategoryImage:req.file.path,
    CategoryDescription: req.body.CategoryDescription,
   
  }, {new: true})
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "User not found with id " + req.params.Id
          });
      }
      else{
        res.status(200).json({
          message: "User data updated successfully",
          user: note
        });
    }
  }).catch(err => {
      if(err.kind === 'userId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.Id
          });                
      }
      return res.status(500).send({
          message: "Error updating User with id " + req.params.Id
      });
  });

});



////category delete..........
router.delete('/DeleteCategory/:id',async(req,res)=>
{
    
    try{
      console.log(req.params.id)
        const deleteCategory=await CategoryCollection.find({_id:req.params.id}).remove()
        res.status(200).send({
            message:"Delete Successfully from BrandCollection!!!",
            deleteCategory
        })
    }catch(e)
    {
        res.status(500).send({
            message:"Internal Server Error!!",e
        })
    }
})

module.exports = router