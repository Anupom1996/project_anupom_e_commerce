import React, { Component, Fragment } from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import ProductNavbar from '../components/product/ProductNavbar';
import ShowCategory from '../components/ShowCategory/ShowCategory';
import ProducuctShow from '../components/ShowProduct/ProducuctShow';
class ProductPage extends Component {
    render() {
        return (
            <Fragment>
                 <Dashboard_navBar></Dashboard_navBar>
                <ProductNavbar></ProductNavbar>
                <ProducuctShow></ProducuctShow>
            </Fragment>
        );
    }
}

export default ProductPage;