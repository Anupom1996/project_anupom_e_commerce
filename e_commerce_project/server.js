const express=require('express')
const app=express()
const path=require('path')
bodyParser = require('body-parser')
//call .env 
require('dotenv').config()

////fronend server headers.....
var logger = require('morgan');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'));
//app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
//require database
require('./Database_Project/database')
var cors = require('cors');
app.use(cors({
  Origin: 'http://localhost:4200'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     next();
//   });
//require router
const Admin_Data=require('./Admin/Router/admin')
app.use(Admin_Data)

const UserRegistration_Data=require('./User/Router/user')
app.use(UserRegistration_Data)

const Product_Data=require('./Product/Router/product')
app.use(Product_Data)

const Category_Data=require('./Category/Router/category')
app.use(Category_Data)

const Brand_Data=require('./Brand/Router/Brand')
app.use(Brand_Data)


//....CategoryPicture....upload Static path....

app.use('/CategoryPicture/',express.static('CategoryPicture'))


app.use('/ProductPicture/',express.static('ProductPicture'))
//server port
const PORT=process.env.port
app.listen(PORT,()=>
{
    console.log(`Server Is Running ..!!PORT no is ${PORT}`)
})