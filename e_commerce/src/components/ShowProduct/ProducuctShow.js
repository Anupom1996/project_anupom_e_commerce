import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';

import { BsPencilSquare } from 'react-icons/bs';
class ProducuctShow extends Component {


    constructor() {
        super();
        this.state = {
            Product: {}

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
    render() {
        const {Product}=this.state
        console.log(this.state.Product)
        return (
            <Fragment>
                 <div>ProductList</div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ProductName</th>
                            <th>ProductImage</th>
                            <th>Stock</th>
                            <th>ProductDescription</th>
                            <th>ProductSpecification</th>
                            
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
                                        <BsFillTrashFill onClick={() => this.deleteCategory(Pro._id)}></BsFillTrashFill>
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

export default ProducuctShow;