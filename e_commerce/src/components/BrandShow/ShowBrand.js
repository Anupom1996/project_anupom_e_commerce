import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';
import UpdateBrand from '../UpdateBrand/UpdateBrand'
import { BsPencilSquare } from 'react-icons/bs';
import { Redirect, NavLink, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

class ShowBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Brands: [],
            editBrand: false
        }
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
    ShowBrand = () => {

        this.componentDidMount()
    }
    deleteBrand = (Brandid) => {
        console.log(Brandid)
        if (window.confirm("are you sure ")) {
            axios.delete('http://localhost:3050/DeleteBrand/' + Brandid)
                .then(res => {
                    console.log("successfully delete")
                    console.log(res)
                    this.ShowBrand()
                })
                .catch(err => {
                    console.log("error")
                })
        }

    }

    shouldComponentUpdate(props) {
        if (props.filteredBrands && props.filteredBrands.length && JSON.stringify(props.filteredBrands) != JSON.stringify(this.state.Brands)) {
            this.setState({ Brands: props.filteredBrands });
            return true;
        }
        else if (this.state.Brands) {
            return true;
        }
        return false;
    }

    editBrand = (brandid) => {
        const { history } = this.props;
        history.push("/");
        // console.log(brandid);
        // alert ("aa");
        // return <Redirect to="/login/dashboard/brand/editbrand"></Redirect>
        // const history = useHistory();
        // let path = `/login/dashboard/brand/editbrand`;
        // history.push(path);
        // this.props.history.push('/'

    }

    render() {
        const { Brands } = this.state
        console.log(this.state.Brands)

        return (
            <Fragment>
                <div>brandlist</div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>BrandName</th>
                            <th>Action</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {(Brands.length > 0) ? Brands.map((Brand, index) => {
                            return (
                                <tr key={index}>
                                    <td>{Brand.BrandName}</td>
                                    <td>
                                        <BsFillTrashFill onClick={() => this.deleteBrand(Brand._id)}></BsFillTrashFill>
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                   <BsPencilSquare onClick={() => this.editBrand(Brand._id)}></BsPencilSquare>
                                    {/* <Link to='/login/dashboard/brand/editbrand'>Edit</Link> */}
                                    </td>

                                </tr>

                            )
                        }) : <tr><td colSpan="5">Loading...</td></tr>}
                    </tbody>
                </table>


            </Fragment >
        );
    }
}

export default ShowBrand;


