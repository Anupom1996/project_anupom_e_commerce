import React, { Component, Fragment } from 'react';
import './AddProduct.css'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class AddProduct extends Component {

    constructor() {
        super();
        this.state = {
            Brands: [],
            fields: {
                ProductName:'',
                BrandId:[],
                ProductImage: [],
                ProductPrice:'',
                ProductDescrption:'',
                ProductSpecification:'',
                Stock:''

            },
            ProductImage:[],
            errors: {
                ProductName:'',
                BrandId:[],
                ProductImage:[],
                ProductPrice:'',
                ProductDescrption:'',
                ProductSpecification:'',
                Stock:''
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }
    
    onSelectFile = (event) =>{
        console.log(event.target.files)
        for (let file of event.target.files) {
            this.setState({
                ProductImage: file
            })
        }
        // console.log("the length",event.target.files.length)
        // const ProductImage = Array.from(event.target.files);
        // for (var i = 0; i < event.target.files.length; i++) {
        //     var ProductImages= event.target.files[i];
        // }
        // this.setState({ProductImage});
        // console.log("his is ",this.state.fields.ProductImage)
        
    }

    // onSelectFile = (event) => {
    //     let addedFiles = this.state.files.concat(event.target.files)
    //     this.setState({ ProductImage: addedFiles })
    //     // console.log("upload file " + file.name)
    //     }

    onChangeHandler = (event) => {
        let fields = this.state.fields;
        if(event.target.name == "BrandId"){
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                value.push(options[i].value);
                }
            }
            fields[event.target.name] = value;
        }else{
            fields[event.target.name] = event.target.value;
        }
        this.setState({
            fields
        })
        console.log("thisis",fields);
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
        
        if(!this.state.fields["ProductSpecification"]) {
            errors["ProductSpecification"] = "Please enter the Product Specification";
            isValid = false;
        }
        if(!this.state.fields["Stock"]) {
            errors["Stock"] = "Please enter the Product Stock";
            isValid = false;
        }
        if(!this.state.fields["ProductPrice"]) {
            errors["ProductPrice"] = "Please enter the Product Price";
            isValid = false;
        }
        
        this.setState({
            errors: errors,
        })
        return isValid
    }

    addProduct= (event) => {
        event.preventDefault();
     
        if (this.isValidForm()) {
            // let formData =new FormData()
            // for(let image of this.fields.ProductImage)
            // {
            //     formData.append('ProductImage',image)
            // }
            // formData.append('ProductName',this.fields.ProductNameProductName)
            // formData.append('ProductDescription',this.fields.ProductDescription)
            // formData.append('ProductSpecification',this.fields.ProductSpecification)
            // formData.append('BrandId',this.fields.BrandId)
            // formData.append('ProductPrice',this.fields.ProductPrice)
            this.state.fields["ProductImage"] =this.state.fields.ProductImage;
            console.log("fields",this.state.fields.ProductImage)
            console.log("this is",this.state.fields.ProductImage)
            axios.post('http://localhost:3050/productInsert')
                .then(response => {
                    console.log("aaa************aas")
                    console.log(response)
                    this.setState({
                        isRegister: true
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        const { Brands, ProductName,ProductPrice,ProductSpecification,ProductDescription,Stock,ProductImage,BrandId, isRegister } = this.state
        if (isRegister) {
            console.log("yess..........yess")
            return <Redirect to="/login/dashboard/product"></Redirect>
        }
        return (
            
            <Fragment>
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <div className="topLoginBannerOverlay ">
                        <form className="product-form container-sm text-left"  onSubmit={this.addProduct}>
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
                        </form>

                    </div>
                </Container >
            </Fragment>
        );
    }
}

export default AddProduct;