import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
// import '../Login/Login.css'
// import '../Login/Login.css'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            fields: {
                AdminEmail: '',
                AdminPassword: '',
            },
            errors: {
                AdminEmail: '',
                AdminPassword: '',
                isLogin:''
            },
            authlogin: false,
            
        }
    }
    setError = (err, msg) => {
        this.setState({
            error: err,
            errorMessage: msg
        })
    }
    onChangeHandler = (event) => {
        // this.setState({ [event.target.name]: event.target.value })
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({
            fields
        })
    }
    isValidForm = () => {

        let errors = {};
        let formIsValid = true;
        let validationError = false
        var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // validation of Admin Email
        if (!this.state.fields["AdminEmail"]) {
            formIsValid = false;

            errors["AdminEmail"] = "*plz enter the email id"
        }

        if (!this.state.fields["AdminPassword"]) {

            formIsValid = false;
            errors["AdminPassword"] = "*plz enter the Password"
        }
        this.setState({
            errors: errors,
        })
        return formIsValid
    }
    loginHandler = (event) => {
        event.preventDefault();
        console.log("the satate is...")
        console.log(this.state)
        if (this.isValidForm()) {
            axios.post('http://localhost:3050/Adminlogin', this.state.fields)
                .then(response => {
                    console.log("asdfg")
                    console.log(response)
                    console.log(response.data.token)
                    localStorage.setItem("auth", JSON.stringify(response.data.token))
                    this.setState({
                        authlogin: true
                    }).then(response => {
                        toast.success("Login Successful !", setTimeout(() => {
                            toast.success("LOADING ACCOUNT")
                        }, 100), {
                        });
                    }).catch(err => {
                        toast.error(err.response.data, {
                            position: toast.POSITION.TOP_LEFT
                        });
                    });
                },
                    err => {
                        this.setState({ errors: { isLogin: err.response.data.err } });
                    })
                .catch(error => {
                    console.log(error)
                })
        }

    }
    render() {
        const { AdminEmail, AdminPassword, authlogin,isLogin } = this.state
        if (authlogin) {
            return <Redirect to="/login/dashboard"></Redirect>
        }


        return (
            <Fragment>
                <Container className="topFixedLoginBanner" fluid={true} className="topFixedBanner p-0">
                    <ToastContainer />
                    <div className="topLoginBannerOverlay">
                        <form onSubmit={this.loginHandler} className="loginForm">
                            <h1 className="loginForm-h1">LOGIN</h1><br></br><br></br><br></br>
                            <label className="loginForm-label">Admin Email</label><br></br>
                            <input type="text" onChange={this.onChangeHandler} className="loginForm-textBox" name="AdminEmail" value={AdminEmail} placeholder="email" ></input><br></br>
                            <div className="errMessage">{this.state.errors.AdminEmail}</div>
                            <label className="loginForm-label">Admin Password</label><br></br>
                            <input type="password" onChange={this.onChangeHandler} className="loginForm-textBox" name="AdminPassword" value={AdminPassword} placeholder="password" ></input><br></br>
                            <div className="errMessage">{this.state.errors.AdminPassword}</div>
                            <br></br><input type="submit" value="Sign In" className="loginForm-submit"></input><br></br>
                            <div>
                                <br></br><br></br><br></br>
                                <Button variant="light" ><Link to="/register">Register</Link></Button>
                            </div>
                            <div className="errMessage">
                                {this.state.errors.isLogin}
                            </div>
                        </form>
                    </div>
                </Container>
                {/* <span>{this.error1}</span>
                <p>{this.error1}</p> */}
            </Fragment>
        );
    }
}
export default Login;