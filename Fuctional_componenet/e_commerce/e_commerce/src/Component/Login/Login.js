import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution
function Login() {
    let history = useHistory();
    const [adminDetails, setAdminDetails] = useState({});
    const [form, setForm] = useState({
        AdminEmail: '',
        AdminPassword: ''
    })
    const [error, setError] = useState({
        AdminEmail: '',
        AdminPassword: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prevform => ({
            ...prevform,
            [name]: value
        }))
    }
   
    const validForm = () =>{
        let isValid = true;
        let error = {};
        var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!form.AdminEmail)
        {
            isValid = false;
            error["AdminEmail"]="Plz Enter The Email"
            setError(error);
        }
        else
        {
            if(!form.AdminEmail.match(mail))
            {
                isValid = false;
                 error["AdminEmail"]="Plz Enter The validEmail"
                 setError(error);
            }
        }
        if(!form.AdminPassword){
            isValid = false;
            error["AdminPassword"]="Plz Enter The Password"
            setError(error);
        }
        return isValid;
    }
    const SignIn = (e) => {
        e.preventDefault();
        console.log(form)
        if (validForm()) {
            axios.post('http://localhost:3050/Adminlogin', form)
                .then(response => {
                   
                    console.log(response)
                    setAdminDetails(response.data.user)

                    localStorage.setItem("auth", JSON.stringify(response.data.token))
                
                    history.push({ pathname: "/login/dashboard", state: response.data.user })


                    // toast.success("login successful")  

                },
                    err => {
                        // this.setState({ errors: { isLogin: err.response.data.err } });
                        //   toast.error("login fail") 
                        // console.log("xyy")
                        // return <Redirect to="/login"></Redirect>
                    })
                // .then(res => { toast.success("login successfull") })
                .catch(error => {
                    console.log(error)

                })
        }


    }
    return (
        <Fragment>
             <ToastContainer/>
            this is login page
            <h1>AdminLogin</h1>
            <form onSubmit={SignIn}>
                <label>Admin Name</label><br></br>
                <input type="text" name="AdminEmail"
                    value={form.AdminEmail}
                    onChange={handleChange}>
                </input><br></br>
                
              <div >{error.AdminEmail}</div><br></br>

                <label>Admin password</label><br></br>
                <input type="password"
                    name="AdminPassword"
                    value={form.AdminPassword}
                    onChange={handleChange}>
                </input><br></br><br></br>
                <div >{error.AdminPassword}</div><br></br>
                <input type="submit" valiue="sign in"></input>
            </form>

        </Fragment>
    )
}
export default Login;