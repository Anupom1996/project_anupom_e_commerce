import React, { Component, Fragment } from 'react';
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
import BrandNavBar from '../components/BrandNavBar/BrandNavBar';
import ShowBrand from '../components/BrandShow/ShowBrand'
class BrandPage extends Component {

    constructor(){
        super();
        this.state = {
            filteredBrands: []
        }
    }

    emitBrands = (event) => {
        this.setState({filteredBrands: event});
    }

    render() {
        return (
            <Fragment>
                <Dashboard_navBar></Dashboard_navBar>
                <BrandNavBar onSearch={this.emitBrands}></BrandNavBar>
                <ShowBrand filteredBrands = {this.state.filteredBrands}></ShowBrand>
            </Fragment>
        )
    }
}
export default BrandPage;