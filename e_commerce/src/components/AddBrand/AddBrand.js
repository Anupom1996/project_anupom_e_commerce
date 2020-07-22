import React, { Component, Fragment } from 'react';
import './AddBrand.css'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class AddBrand extends Component {

    constructor() {
        super();
        this.state = {
            
            fields :{
                BrandName:'',
                isRegister:false,
            
            },
            errors:{
                BrandName:'',
                isRegister:false,
               
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

    isValidForm=()=>{
        let fields= this.state.fields;
        let errors ={};
        let formIsValid=true;
        let validationError=false
        
            // validation of Admin Email
            
            if(!fields["BrandName"])
            {
                formIsValid = false;
                validationError =true;
                errors["BrandName"]="*plz enter the BrandName"
            }
            

            
            this.setState({
                errors:errors,
                
            })
            return formIsValid
            
    }
    register = (event) => {
        
        event.preventDefault();
        if (this.isValidForm()) {
            console.log(this.state)
            console.log(this.state.fields)
            axios.post('http://localhost:3050/BrandInsert', this.state.fields)
           
            .then(res => {toast.success("Brand Added") })
                .then(response => {

                    console.log(response)
                    this.setState({
                         isRegister: true
                    })

                })
                // .then(setTimeout(()=>{
                //     toast.success("LOADING ACCOUNT") 
                // }),2000)
                
                .catch(error => {
                    console.log(error)
                })

        }

    }

    back=()=>{
        return <Redirect to="/login/dashboard/brand"></Redirect>
    }

    render() {
        const { BrandName, isRegister } = this.state
        if (isRegister) {
            setTimeout(()=>{
                toast.success(<Redirect to="/login/dashboard/brand"></Redirect>) 
            },2000)
            // return <Redirect to="/login/dashboard/brand"></Redirect>
            // alert("successfull insert")
        }
        return (
            <Fragment>
            <Container className="topFixedLoginBanner p-0" fluid={true} >

                    <div className="topLoginBannerOverlay">
                        <form className="registration-Form" onSubmit={this.register}>
                            <div>
                                <h1 className="registration-Form-h1">ADD-BRAND</h1>
                            </div>

                            <br></br>
                            <div className="registrationForm-label">
                                <label>BrandName </label>
                                <ToastContainer />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="text" className="" placeholder="brand" name="BrandName" value={BrandName}  onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.BrandName}</div>
                            </div>


                            <br></br>

                          
                            <div >
                                <br></br><br></br>
                                <input type="submit" value="submit" className="registrationForm-submit"></input>
                               
                            </div>
                            <div >
                                <br></br><br></br>
                               
                                <Link to="/login/dashboard/brand">Back</Link>
                            </div>
                        </form>
                        
                    </div>
                </Container>
            </Fragment>
               
        );
    }
}

export default AddBrand;