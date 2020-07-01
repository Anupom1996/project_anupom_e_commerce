import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import './AdminRegister.css'
// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'

class AdminRegister extends Component {


    constructor() {
        super();
        this.state = {
            
            fields :{
                AdminEmail:'',
            AdminPassword:'',
            AdminFirstName:'',
            AdminLastName:'',
            AdminPhone:'',
            isRegister:false,
            error:'',
            errMessage:''
            },
            errors:{
                AdminEmail:'',
                AdminPassword:'',
                AdminFirstName:'',
                AdminLastName:'',
                AdminPhone:'',
                isRegister:false,
                error:'',
                errMessage:''
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
        let errors =this.state.fields;
        let formIsValid=true;
        let validationError=false
        var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,20}$/;
        var phoneNo = /^[789]\d{9}$/;
        var fNameFirstLetter=this.state.fields.AdminFirstName.slice(0,1);
        var lNameFirstLetter=this.state.fields.AdminLastName.slice(0,1);
        
            // validation of Admin Email
            
            if(!fields["AdminEmail"])
            {
                formIsValid = false;
                validationError =true;
                errors["AdminEmail"]="*plz enter the email id"
            }
            if(typeof fields["AdminEmail"]!== "undefined")
            {
                if (!fields["AdminEmail"].match(mail))
                {
                    validationError =2;
                    formIsValid = false;
                    errors["AdminEmail"]="*plz enter the valid Email"
                }
                
            }

            //validation of Admin Password.....


            if(!fields["AdminPassword"])
            {
                validationError =2;
                formIsValid = false;
                errors["AdminPassword"]="*plz enter the Password"
            }
            if(typeof fields["AdminPassword"]!== "undefined")
            {
                
                if (fields["AdminPassword"].length<6)
                {
                    validationError =2
                    formIsValid = false;
                    errors["AdminPassword"]="*minimum 6 letters"
                }
                else if (fields["AdminPassword"].length>20)
                {
                    validationError =2;
                    formIsValid = false;
                    errors["AdminPassword"]="*maximum 20 letters"
                }
                
                else if (!fields["AdminPassword"].match(pass))
                {
                    validationError =2;
                    formIsValid = false;
                    errors["AdminPassword"]="*must contain:@!#$%"
                }
                
            }


            //validation of admin First Name.....


            if(!fields["AdminFirstName"])
            {
                validationError =2;
                formIsValid = false;
                errors["AdminFirstName"]="*plz enter the Firstname"
            }

            if (fNameFirstLetter>= 'a' && fNameFirstLetter <= 'z') {
                validationError =2;
                formIsValid = false;
                errors["AdminFirstName"]="* first letter contain Capital"
              }

             //validation of admin Last Name....
             
             
            if(!fields["AdminLastName"])
            {
                validationError =2;
                formIsValid = false;
                errors["AdminLastName"]="*plz enter the lastname"
            }
            if (lNameFirstLetter>= 'a' && lNameFirstLetter <= 'z') {
                validationError =2;
                formIsValid = false;
                errors["AdminLastName"]="* first letter contain Capital"
              }

            //validation of Admin Phone........


            if(!fields["AdminPhone"])
            {
                validationError =2;
                formIsValid = false;
                errors["AdminPhone"]="*plz enter the phone"
            }
            
            if(typeof fields["AdminPhone"]!== "undefined")
            {
                
                if (!fields["AdminPhone"].match(phoneNo))
                {
                    validationError =2;
                    formIsValid = false;
                    errors["AdminPhone"]="*plz enter the valid Phone  no"
                }
                
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
            // let fields ={}
            //     fields["AdminEmail"]=" ";
            //     fields["AdminPassword"]=" ";
            //     fields["AdminFirstName"]=" ";
            //     fields["AdminLastName"]=" ";
            //     fields["AdminPhone"]=" ";
            //     this.setState({
            //         fields:fields
            //     })
            axios.post('http://localhost:3050/adminRegistration', this.state.fields)
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
        const { AdminEmail, AdminPassword, AdminFirstName, AdminLastName, AdminPhone, isRegister } = this.state
        if (isRegister) {
            alert ("Successfully Registered")
            return <Redirect to="/login"></Redirect>
        }
        // console.log(this.state.errors)
        return (
            <Fragment>
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <div className="topLoginBannerOverlay">
                        <form className="registration-Form" onSubmit={this.register}>
                            <div>
                                <h1 className="registration-Form-h1">REGISTRATION</h1>
                            </div>

                            <br></br>
                            <div className="registrationForm-label">
                                <label>AdminEmail </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="text" className="" placeholder="Email" name="AdminEmail" value={AdminEmail} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.AdminEmail}</div>
                            </div>


                            <br></br>

                            <div className="registrationForm-label">
                                <label>AdminPassword </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="password" className="" placeholder="Passwords" name="AdminPassword" value={AdminPassword} onChange={this.onChangeHandler} ></input>
                                <div className="errMessage">{this.state.errors.AdminPassword}</div>
                                {/* <div className="errMessage">{this.state.validationError ? this.state.errors.AdminPassword:" "}</div> */}
                            </div>

                            <br></br>
                            <div className="registrationForm-label">
                                <label>AdminFirstName </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                
                                :<input type="text" className="" placeholder="FirstName" name="AdminFirstName" value={AdminFirstName} onChange={this.onChangeHandler} ></input>
                                <div className="errMessage">{this.state.errors.AdminFirstName}</div>
                                {/* <div className="errMessage">{this.state.validationError ? this.state.errors.AdminFirstName:" "}</div> */}
                            </div>
                            <br></br>

                            <div className="registrationForm-label">
                                <label>AdminLastName</label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="text" className="" placeholder="LastName" name="AdminLastName" value={AdminLastName} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.AdminLastName}</div>
                                {/* <div className="errMessage">{this.state.validationError!=undefined? this.state.errors.AdminLastName:" "}</div> */}
                            </div>
                            <br></br>
                            <div className="registrationForm-label">
                                <label>AdminPhoneNumber </label>
                                :<input type="text" className="" placeholder="Phone" name="AdminPhone" value={AdminPhone} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.AdminPhone}</div>
                                {/* <div className="errMessage">{this.state.validationError ? this.state.errors.AdminPhone:" "}</div> */}
                            </div>
                            <div >
                                <br></br><br></br>
                                <input type="submit" value="submit" className="registrationForm-submit"></input>
                            </div>
                            <br></br>
                            <div>
                                <Link to="/">Back</Link>
                            </div>
                        </form>
                        
                    </div>
                </Container>
            </Fragment>
        );
    }
}

export default AdminRegister;