import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import '../Login/style.css'
import {Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
const Login= ()=>(
    <Formik
     initialValues={{AdminEmail: '', AdminPassword: '',}}
    onSubmit={(values,{setSubmitiing})=>{
        console.log('loggin')
    }}
     validationSchema = {Yup.object().shape({
         AdminEmail: Yup.string().min(5).required(),
         AdminPassword: Yup.string().min(6).max(250).required().matches(/(?=.*[0-9])/,('Password must contain number')),
     })}
    >
        {
            props =>{
                const{
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    isSubmitting,
                } = props;
                const onSubmitLogin = ()=>{
                    const LoginUser = {
                        AdminEmail: values.AdminEmail,
                        AdminPassword: values.AdminPassword
                    }
                    if(!LoginUser.AdminEmail || !LoginUser.AdminPassword){
                       return false
                    }
                    axios.post( "http://localhost:3050/Adminlogin",LoginUser).then(res => {
                        localStorage.setItem("auth",JSON.stringify(res.data))
                        return res.data;
                    }).then(res => {toast.success("Login Successful !", setTimeout(()=>{
                        toast.success("LOADING ACCOUNT") 
                    },2000),{
                        });}).catch(err => {toast.error(err.response.data, {
                        position: toast.POSITION.TOP_LEFT
                      });
                });
                }
                return(
                    <div className='form-main'>
                        <ToastContainer/>
                        <div className='form-a'>
                            <div className='memberNow'>
                                <h1>LOGIN</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tr>
                                        <td><label>Email:</label></td>
                                        <td><input value={values.AdminEmail} name='AdminEmail' onChange={handleChange} onBlur={handleBlur} className={errors.AdminEmail && touched.AdminEmail && 'error'} placeholder='User Name'/>
                                        {errors.AdminEmail && touched.AdminEmail && (
                                            <div className='inputFeedBack'>{errors.AdminEmail}</div>
                                        )}</td>
                                    </tr>
                                    <tr>
                                        <td><label>Password:</label></td>
                                        <td><input value={values.AdminPassword} name='AdminPassword' onChange={handleChange} onBlur={handleBlur} className={errors.AdminPassword && touched.AdminPassword && 'error'} placeholder='Password'/>
                                        {errors.AdminPassword && touched.AdminPassword && (
                                            <div className='inputFeedBack'>{errors.AdminPassword}</div>
                                        )}</td>
                                    </tr>
                                    <tr>
                                        <td><a href=''><button type='submit' className='btn btn-warning' disable={isSubmitting} onClick={onSubmitLogin}>Login</button></a></td>
                                        <td><a href='/forgotpassword' className='btn forgetPassword btn-danger'>Forgot Password</a></td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                )
            }
        }
    </Formik>
)
export default Login;