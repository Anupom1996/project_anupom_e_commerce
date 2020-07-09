import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';

import { BsPencilSquare } from 'react-icons/bs';
class ProducuctShow extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Product: []

        }
    }
    componentDidMount() {
        axios.get('http://localhost:3050/ShowProduct')
            .then(res => {
                console.log(res)
                this.setState({
                    Product: res.data.Product,

                })


            })
            .catch(err => {
                console.log("error")
            })
    }
    shouldComponentUpdate(props) {
        if(props.filteredProducts && props.filteredProducts.length && JSON.stringify(props.filteredProducts) != JSON.stringify(this.state.Product)){
            this.setState({Product: props.filteredProducts});
            return true;
        }
        else if(this.state.Product){
            return true;
        }
        return false;
    }
    render() {
        const {Product}=this.state
        console.log(this.state.Product)
        return (
            <Fragment>
                 <div>ProductList</div>
                <table className="table table-bordered table-sm " >
                    <thead className="thead-dark">
                        <tr>
                            <th>ProductName</th>
                            <th>ProductImage</th>
                            <th>Stock</th>
                            <th>ProductDescription</th>
                            <th>ProductSpecification</th>
                            <th>ProductPrice</th>
                            <th>Action</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {(Product.length > 0) ? Product.map((Pro, index) => {
                            return (
                                <tr key={index}>
                                    <td>{Pro.ProductName}</td>
                                    <td>


                                    {Pro.ProductImage.map(c =>  <img src={'http://localhost:3050/' + c} 
                                     alt="not found" height="100"
                                            width="200"></img> )} 
                                        
                                    </td>
                                    
                                    <td>
                                        {Pro.Stock}
                                    </td>
                                    <td>
                                        {Pro.ProductDescription}
                                    </td>
                                    <td>
                                    
                                       {Pro.ProductSpecification}
                                    </td>
                                    <td>
                                        {Pro.ProductPrice}
                                    </td>
                                    <td>
                                        <BsFillTrashFill onClick={() => this.deleteCategory(Pro._id)}className="delete-style" ></BsFillTrashFill>
                                   &nbsp; &nbsp; 
                                   <BsPencilSquare className="edit-style" ></BsPencilSquare>
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

export default ProducuctShow;