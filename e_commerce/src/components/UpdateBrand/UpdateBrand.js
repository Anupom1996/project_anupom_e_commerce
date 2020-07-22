import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
import './UpdateBrand.css'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import '../../asset/css/bootstrap.min.css'
import BrandNavBar from '../BrandNavBar/BrandNavBar';
// import '../Login/Login.css'

class UpdateBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {

            fields: {
                BrandName: '',
                isRegister: false,

            },
            errors: {
                BrandName: '',
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
            fields: fields
        })
    }
    isValidForm = () => {
        let fields = this.state.fields;
        let errors = {};
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
    componentWillMount() {
        axios.get('http://localhost:3050/ShowBrand/' + this.props.match.params.id)
            .then(res => {
                let fields = this.state.fields;
                fields.BrandName = res.data.Brand[0].BrandName
                this.setState({
                    fields: fields,
                    isedit: false
                })
            })
    }
    register = (event) => {

        event.preventDefault();
        if (this.isValidForm()) {
            console.log(this.state)
            console.log("the props is", this.props.match.params.id)
            axios.put('http://localhost:3050/UpadteBrand/' + this.props.match.params.id, this.state.fields)
                .then(response => {
                    console.log(response)
                    // toast.success(setTimeout(() => {
                    //     toast.success("update ")
                    // }, 100))
                    toast.success("update success")
                    this.setState({

                        isRegister: true,


                    })

                    // toast.success("update success")

                })
                // .then(response => {
                //     toast.success(setTimeout(() => {
                //         toast.success("update ")
                //     }, 100), {
                //     });
                // })
                .catch(error => {
                    console.log(error)
                })

        }

    }
    back = () => {
        return <Redirect to="/login/dashboard/brand"></Redirect>
    }

    render() {
        const { isRegister } = this.state
        if (isRegister) {
            // <ToastContainer />
            return <Redirect to="/login/dashboard/brand"></Redirect>

        }
        return (
            <Fragment>
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <ToastContainer />
                    <div className="topLoginBannerOverlay">
                        <form className="registration-Form" onSubmit={this.register}>
                            <div>
                                <h1 className="registration-Form-h1">EDIT-BRAND</h1>
                            </div>

                            <br></br>

                            <div className="registrationForm-label">
                                <label>BrandName </label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                :<input type="text" className="" placeholder="brand" name="BrandName" value={this.state.fields.BrandName} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.BrandName}</div>
                                {/* this.props.match.params.name} */}
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
        )
    }
}

export default UpdateBrand;