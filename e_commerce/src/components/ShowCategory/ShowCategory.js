import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';
import {Button} from 'react-bootstrap'
import { BsPencilSquare } from 'react-icons/bs';
class ShowCategory extends Component {

    constructor() {
        super();
        this.state = {
            Category: {}

        }
    }
    componentDidMount() {
        axios.get('http://localhost:3050/ShowCategory')
            .then(res => {
                console.log(res)
                this.setState({
                    Category: res.data.categoryData,

                })


            })
            .catch(err => {
                console.log("error")
            })
    }
    deleteCategory=(Catid)=>{
        if(window.confirm("are you sure "))
       {
        axios.delete('http://localhost:3050/DeleteCategory/'+Catid)
        .then(res=>{
            console.log("successfully delete")
            console.log(res)
           this.ShowCategory()
        })
        .catch(err=>{
            console.log("error")
        })
       }
    }
    ShowCategory=()=>{
        this.componentDidMount();
    }
    render() {
        const { Category } = this.state
        console.log(this.state.Category)
        console.log(this.state.Category.CategoryName)
        return (
            <Fragment>
                <div>Categorylist</div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>CategoryName</th>
                            <th>CategoryImage</th>
                            <th>categorybrands</th>
                            <th>categoryDescription</th>
                            <th>Action</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {(Category.length > 0) ? Category.map((Cat, index) => {
                            return (
                                <tr key={index}>
                                    <td>{Cat.CategoryName}</td>
                                    <td>
                                        <img src={'http://localhost:3050/' + Cat.CategoryImage} alt="not found" height="100"
                                            width="200"></img>
                                        {/* {Cat.CategoryImage} */}
                                    </td>
                                    <td>
                                        {Cat.CategoryBrands.map(c => c.BrandName).join(", ")}
                                    </td>
                                    <td>
                                        {Cat.CategoryDescription}
                                    </td>

                                    <td>
                                        <BsFillTrashFill onClick={() => this.deleteCategory(Cat._id)}></BsFillTrashFill>
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                   <BsPencilSquare ></BsPencilSquare>
                                    </td>
                                </tr>

                            )
                        }) : <tr><td colSpan="5">Loading...</td></tr>}
                    </tbody>
                </table>
                

            </Fragment>
        );
    }
}

export default ShowCategory;