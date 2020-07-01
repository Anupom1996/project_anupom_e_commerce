import React, { Component, Fragment } from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import ProductNavbar from '../components/product/ProductNavbar';
class ProductPage extends Component {
    render() {
        return (
            <Fragment>
                 <Dashboard_navBar></Dashboard_navBar>
                <ProductNavbar></ProductNavbar>
            </Fragment>
        );
    }
}

export default ProductPage;