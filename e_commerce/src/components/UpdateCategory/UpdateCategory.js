import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class UpdateCategory extends Component {
    constructor() {
        super();
        this.state = {
            Brands: [],
            image: true,
            CategoryImage: '',
            fields: {
                CategoryName: '',
                CategoryBrands: [],

                CategoryDescription: '',
                isRegister: false,
            },
            errors: {
                CategoryName: '',
                CategoryBrands: [],
                CategoryImage: '',
                CategoryDescription: '',
                isRegister: false,
            }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.editCategory = this.editCategory.bind(this);
    }
    onChangeHandler = (event) => {

        let fields = this.state.fields;
        if (event.target.name == "CategoryBrands") {
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            fields[event.target.name] = value;
        }
        else {

            fields[event.target.name] = event.target.value;
        }

        this.setState({
            fields:fields
        })
        console.log("thisis", fields);
    }
    onSelectFile = (event) => {
        // debugger;
        let fields = this.state.fields;


        console.log("the length", event.target.files)
        this.setState({ CategoryImage: event.target.files[0] });


    }
    componentDidMount() {
        axios.get('http://localhost:3050/ShowBrand')
            .then(res => {
                this.setState({
                    Brands: res.data.allBrand,
                })
                // axios.get('http://localhost:3050/ShowCategory/' + this.props.match.params.id)
                //     .then(res => {
                //         console.log(res)
                //         //    console.log(res.data.Brand[0].BrandName)
                //         this.setState({
                //             CategoryName: res.data.categoryData.CategoryName,
                //             CategoryDescription: res.data.categoryData.CategoryDescription,
                //             CategoryImage: res.data.categoryData.CategoryImage,
                //             CategoryBrands: res.data.categoryData.CategoryBrands[0].BrandName
                //         })
                //     })

            })
            .catch(err => {
                console.log("error")
            })
    }
    componentWillMount() {
        axios.get('http://localhost:3050/ShowCategory/' + this.props.match.params.id)
            .then(res => {
                let fields = this.state.fields;
                    fields.CategoryName = res.data.categoryData.CategoryName;
                    fields.CategoryDescription = res.data.categoryData.CategoryDescription;
                    fields.CategoryImage = res.data.categoryData.CategoryImage;
                    fields.CategoryBrands = res.data.categoryData.CategoryBrands[0].BrandName;
                this.setState({
                    fields: fields,
                    isedit: false
                })
            })
    }
    isValidForm = () => {
        let errors = {};
        let isValid = true;
        if (!this.state.fields["CategoryName"]) {
            errors["CategoryName"] = "*plz enter the CategoryName";
            isValid = false;
        }
        if (!this.state.fields["CategoryDescription"]) {
            errors["CategoryDescription"] = "Please enter the Category Description";
            isValid = false;
        }

        // if (!this.state.fields["CategoryImage"]) {

        //     errors["CategoryImage"] = "Please Choose the Image";
        //     isValid = false;
        // }
        // if (!this.state.fields["CategoryBrands"]) {
        //     console.log("asdg")
        //     errors["CategoryBrands"] = "Please Choose the Brands";
        //     isValid = false;
        // }

        this.setState({
            errors: errors,
        })
        return isValid
    }
    editCategory = (event) => {
        event.preventDefault();

        if (this.isValidForm()) {

            console.log("this....is..category brands", this.state.fields.CategoryBrands)
            const data = new FormData()

            data.append('CategoryImage', this.state.CategoryImage)
            data.append('CategoryName', this.state.fields.CategoryName)
            data.append('CategoryDescription', this.state.fields.CategoryDescription)
            data.append('CategoryBrands', this.state.fields.CategoryBrands)
            axios.patch('http://localhost:3050/CategoryUpdate/' + this.props.match.params.id, data)
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
        const { Brands, CategoryName, CategoryBrands, CategoryImage, CategoryDescription, isRegister } = this.state
        if (isRegister) {
            console.log("yess..........yess")
            return <Redirect to="/login/dashboard/category"></Redirect>
        }

        return (
            <Fragment>
                <Container className="topFixedLoginBanner p-0" fluid={true} >
                    <div className="topLoginBannerOverlay ">
                        <form className="category-Form container-sm text-left" onSubmit={this.editCategory}>
                            <div>
                                <h1 className="registration-Form-h1">EDIT-Category</h1>
                            </div>

                            <br></br>


                            <div className="registrationForm-label">
                                <label>CategoryName </label>



                                :<input type="text" className="form-control" placeholder="Category" name="CategoryName" value={this.state.fields.CategoryName} onChange={this.onChangeHandler}></input>
                                <div className="errMessage">{this.state.errors.CategoryName}</div>
                            </div>


                            <div className="registrationForm-label">
                                <label>Choose Image </label>


                                : <input className="form-control" onChange={this.onSelectFile} type="file" name="CategoryImage" />
                                <div className="errMessage">{this.state.errors.CategoryImage}</div>
                            </div>

                            <div className="registrationForm-label">
                                <label > Category Brands</label>
                                <select name="CategoryBrands"
                                    className="form-control"
                                    value={CategoryBrands} onChange={this.onChangeHandler} multiple >
                                    <option>Select Brand</option>
                                    {this.state.Brands.map(brand => <option key={brand.id} value={brand.id}>{brand.BrandName}</option>)}
                                </select>
                                <div className="errMessage">{this.state.errors.CategoryBrands}</div>
                            </div>


                            <div className="registrationForm-label">
                                <label>CategoryDescription </label>
                                :<textarea className="form-control max-height" placeholder="Description" name="CategoryDescription" value={CategoryDescription} onChange={this.onChangeHandler}></textarea>
                                <div className="errMessage">{this.state.errors.CategoryDescription}</div>
                            </div>

                            <br></br>


                            <div >

                                <input type="submit" value="submit" className=" btn btn-primary"></input>


                                <Link to="/login/dashboard/category" className="btn btn-primary">Back</Link>
                            </div>
                        </form>

                    </div>
                </Container >
            </Fragment >
        );
    }
}

export default UpdateCategory;