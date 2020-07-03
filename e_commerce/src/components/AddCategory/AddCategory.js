import React, { Component, Fragment } from 'react';
import './AddCategory.css'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class AddCategory extends Component {
    constructor() {
        super();
        this.state = {
            brands:'',
            fields: {
                CategoryName: '',
                CategoryBrands: {},
                CategoryImage: '',
                CategoryDescription: '',
                isRegister: false,

            },
            errors: {
                CategoryName: '',
                CategoryBrands: {},
                CategoryImage: '',
                CategoryDescription: '',
                isRegister: false,
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.register = this.register.bind(this);
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
                console.log(res)
                this.setState({
                    Brands: res.data.allBrand,

                })


            })
            .catch(err => {
                console.log("error")
            })
    }
    isValidForm = () => {
        let fields = this.state.fields;
        let errors = this.state.fields;
        let formIsValid = true;
        let validationError = false

        // validation of Admin Email

        if (!fields["BrandName"]) {
            formIsValid = false;
            validationError = true;
            errors["BrandName"] = "*plz enter the BrandName"
        }



        this.setState({
            errors: errors,

        })
        return formIsValid

    }
    register = (event) => {

        event.preventDefault();
        if (this.isValidForm()) {
            console.log(this.state)

            axios.post('http://localhost:3050/CategoryInsert', this.state.fields)
                .then(response => {
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
        const { CategoryName,CategoryBrands, CategoryImage,CategoryDescription, isRegister } = this.state
        if (isRegister) {

            return <Redirect to="/login/dashboard/category"></Redirect>
        }
        return (
            <Fragment>
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <div className="topLoginBannerOverlay">
                        <form className="registration-Form" onSubmit={this.register}>
                            <div>
                                <h1 className="registration-Form-h1">ADD-Category</h1>
                            </div>

                            <br></br>


                            <div className="registrationForm-label">
                                <label>CategoryName </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="text" className="" placeholder="Category" name="CategoryName" value={CategoryName} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.CategoryName}</div>
                            </div>


                            <div className="registrationForm-label">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <label>Choose Image </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;

                                : <input onChange={this.onChangeHandler} type="file" name="CategoryImage" value={CategoryImage} multiple />
                                <div className="errMessage">{this.state.errors.CategoryImage}</div>
                            </div>



                            <div className="registrationForm-label">
                                <label for=""> Category Brands</label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <select name="CategoryBrands" value={CategoryBrands} onChange={this.onChangeHandler} multiple >
                                <option>name</option>
                                
                                </select>
                            </div>


                            <div className="registrationForm-label">
                                <label>CategoryDescription </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<textarea className="" placeholder="Description" name="CategoryDescription" value={CategoryDescription} onChange={this.onChangeHandler}></textarea>
                                <div className="errMessage">{this.state.errors.CategoryDescription}</div>
                            </div>


                    <br></br>


                    <div >
                        <br></br><br></br>
                        <input type="submit" value="submit" className="registrationForm-submit"></input>

                    </div>
                    <div >
                        <br></br><br></br>

                        <Link to="/login/dashboard/category">Back</Link>
                    </div>
                        </form>
                        
                    </div>
                </Container >
            </Fragment >
               
        );
    }
}

export default AddCategory;
// /sssn