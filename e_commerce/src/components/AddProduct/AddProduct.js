import React, { Component, Fragment } from 'react';
import './AddProduct.css'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class AddProduct extends Component {

    constructor() {
        super();
        this.state = {
            Brands: [],
            ProductImage: [],
            fields: {
                ProductName: '',
                BrandId: [],

                ProductPrice: '',
                ProductDescrption: '',
                ProductSpecification: '',
                Stock: ''

            },
            ProductImage: [],
            
            errors: {
                ProductName: '',
                BrandId: [],
                ProductImage: [],
                ProductPrice: '',
                ProductDescrption: '',
                ProductSpecification: '',
                Stock: '',
                isError:'',
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    onSelectFile = (event) => {
        console.log(event.target.files)
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            this.setState({
                ProductImage: event.target.files
            })
        }



    }

    //event handleing............image greater than 3
    maxSelectFile = (event) => {
        let errors = {};
        let isValid = true;
        let files = event.target.files // create file object
        if (files.length > 3) {
            const msg = 'Only 3 images can be uploaded at a time'
            event.target.value = null // discard selected file
            console.log(msg)
            //    errors["ProductImage"] = "Only 3 images can be uploaded at a time'";
            //   isValid=false
            //   return isValid;
            toast.error(msg)
            return false;

        }
        return true;

    }

    //event handling ........file type

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
            toast.error(err)
           return false;
         }
        // for(var z = 0; z<err.length; z++) { // loop create toast massage
        //     event.target.value = null 
        //     toast.error(err[z])
        // }
         return true;

    }


    //event handling ..........picture size.

    checkFileSize = (event) => {
        let files = event.target.files
        let size = 15000*1024*1024
        let err = "";
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        if (err !== '') {
            event.target.value = null
            console.log(err)
            toast.error(err)
            return false
        }

        return true;

    }
    onChangeHandler = (event) => {
        let fields = this.state.fields;

        fields[event.target.name] = event.target.value;

        this.setState({
            fields
        })

    }
    componentDidMount() {
        axios.get('http://localhost:3050/ShowBrand')
            .then(res => {
                this.setState({
                    Brands: res.data.allBrand,
                })


            })
            .catch(err => {
                console.log("error")
            })
    }
    isValidForm = () => {
        let errors = {};
        let isValid = true;
        if (!this.state.fields["ProductName"]) {
            errors["ProductName"] = "*plz enter the ProductName";
            isValid = false;
        }
        if (!this.state.fields["ProductDescription"]) {
            errors["ProductDescription"] = "Please enter the Product Description";
            isValid = false;
        }

        if (!this.state.ProductImage) {

            errors["ProductImage"] = "Please Choose the Image";
            isValid = false;
        }

        if (!this.state.fields["ProductSpecification"]) {
            errors["ProductSpecification"] = "Please enter the Product Specification";
            isValid = false;
        }
        if (!this.state.fields["Stock"]) {
            errors["Stock"] = "Please enter the Product Stock";
            isValid = false;
        }
        if (!this.state.fields["ProductPrice"]) {
            errors["ProductPrice"] = "Please enter the Product Price";
            isValid = false;
        }

        this.setState({
            errors: errors,
        })
        return isValid
    }

    addProduct = (event) => {
        event.preventDefault();

        if (this.isValidForm()) {
            let formData = new FormData()
           
            
                for (var x = 0; x < this.state.ProductImage.length; x++) {
                    formData.append('ProductImage', this.state.ProductImage[x])
                }
            
           

            formData.append('ProductName', this.state.fields.ProductName)
            formData.append('ProductDescription', this.state.fields.ProductDescription)
            formData.append('ProductSpecification', this.state.fields.ProductSpecification)
            formData.append('BrandId', this.state.fields.BrandId)
            formData.append('ProductPrice', this.state.fields.ProductPrice)
            formData.append('Stock', this.state.fields.Stock)

            axios.post('http://localhost:3050/productInsert', formData)
                .then(response => {
                    console.log("aaa************aas")
                    console.log(response)
                    toast.success('add Successfully')
                    this.setState({
                        isRegister: true
                        
                    })
                    
                })
               
                .catch(error => {
                    console.log(error)
                    toast.error('Add fail')
                })
        }
    }

    render() {
        const { Brands, ProductName, ProductPrice, ProductSpecification, ProductDescription, Stock, ProductImage, BrandId, isRegister } = this.state
        if (isRegister) {
            console.log("yess..........yess")
            return <Redirect to="/login/dashboard/product"></Redirect>
        }
        return (

            <Fragment>
                  <ToastContainer />
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <div className="topLoginBannerOverlay ">
                        <form className="product-form container-sm text-left" onSubmit={this.addProduct}>
                            <div>
                                <h1 className="registration-Form-h1">ADD-Product</h1>
                            </div>

                            <br></br>


                            <div className="registrationForm-label">
                                <label>ProductName </label>



                                :<input type="text" className="form-control" placeholder="product" name="ProductName" value={ProductName} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.ProductName}</div>
                            </div>


                            <div className="registrationForm-label">
                                <label>Choose Image </label>


                                : <input className="form-control" onChange={this.onSelectFile}
                                    type="file" name="ProductImage" multiple />
                                <div className="errMessage">{this.state.errors.ProductImage}</div>
                            </div>

                            <div className="registrationForm-label">
                                <label for=""> Product Brands</label>
                                <select name="BrandId"
                                    className="form-control"
                                    value={BrandId} onChange={this.onChangeHandler} multiple >
                                    <option>Select Brand</option>
                                    {this.state.Brands.map(brand => <option value={brand.id} key={brand.id}>{brand.BrandName}</option>)}
                                </select>
                                <div className="errMessage">{this.state.errors.ProductBrands}</div>
                            </div>

                            <div className="registrationForm-label">
                                <label>ProductPrice</label>
                                :<input type="text" className="form-control" placeholder="price" name="ProductPrice" value={ProductPrice} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.ProductPrice}</div>
                            </div>


                            <div className="registrationForm-label">
                                <label>ProductStock</label>
                                :<input type="text" className="form-control" placeholder="Stock" name="Stock" value={Stock} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.Stock}</div>
                            </div>


                            <div className="registrationForm-label">
                                <label>ProductDescription </label>
                                :<textarea className="form-control max-height" placeholder="Description" name="ProductDescription" value={ProductDescription} onChange={this.onChangeHandler}></textarea>
                                <div className="errMessage">{this.state.errors.ProductDescription}</div>
                            </div>

                            <br></br>

                            <div className="registrationForm-label">
                                <label>ProductSpecification </label>
                                :<textarea className="form-control max-height" placeholder="Specification" name="ProductSpecification" value={ProductSpecification} onChange={this.onChangeHandler}></textarea>
                                <div className="errMessage">{this.state.errors.ProductSpecification}</div>
                            </div>

                            <br></br>

                            <div >

                                <input type="submit" value="submit" className=" btn btn-primary"></input>

                                &nbsp;
                                <Link to="/login/dashboard/product" className="btn btn-primary">Back</Link>
                            </div>
                            <div>
                                {this.state.errors.isError}
                            </div>
                        </form>

                    </div>
                </Container >
            </Fragment>
        );
    }
}

export default AddProduct;