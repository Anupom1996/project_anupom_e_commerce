import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';
import {Button} from 'react-bootstrap'
import { BsPencilSquare } from 'react-icons/bs';
class ShowCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Category: []

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
    shouldComponentUpdate(props) {
        if(props.filteredCategorys && props.filteredCategorys.length && JSON.stringify(props.filteredCategorys) != JSON.stringify(this.state.Category)){
            this.setState({Category: props.filteredCategorys});
            return true;
        }
        else if(this.state.Category){
            return true;
        }
        return false;
    }
    render() {
        const { Category } = this.state
        console.log(this.state.Category)
        console.log(this.state.Category.CategoryName)
        return (
            <Fragment>
                <div>
                <h1 className="h1-style">CategoryList</h1>
                </div>
              
                <table border="1" className="table table-bordered table-sm " >
                    <thead>
                        <tr className="purple-bg">
                            <th className="th-style">CategoryName</th>
                            <th className="th-style">CategoryImage</th>
                            <th className="th-style">Categorybrands</th>
                            <th className="th-style">CategoryDescription</th>
                            <th className="th-style">Action</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {(Category.length > 0) ? Category.map((Cat, index) => {
                            return (
                                <tr key={index} className="td-style">
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
                                        <BsFillTrashFill onClick={() => this.deleteCategory(Cat._id)} className="delete-style"></BsFillTrashFill>
                                   &nbsp;
                                   <BsPencilSquare className="edit-style"></BsPencilSquare>
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