import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../components/Login/login'
import HomePage from '../pages/HomePage'
import AdminRegister from '../components/Register/AdminRegister'
import PageNotFound from '../components/ErrorPage/PageNotFound';
import Dashboard from '../pages/Dashboard'
import AuthGuard from '../components/AuthGuard/AuthGuard'
import BrandPage from '../pages/BrandPage'
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';
import AddBrand from '../components/AddBrand/AddBrand';
import UpdateBrand from '../components/UpdateBrand/UpdateBrand';
import AddCategory from '../components/AddCategory/AddCategory';
import AddProduct from '../components/AddProduct/AddProduct'
import UpdateCategory from '../components/UpdateCategory/UpdateCategory';

class AppRoute extends Component {
    render() {
        var auth = JSON.parse(localStorage.getItem('auth'))
        console.log("this is........", auth)
        return (
            <Fragment>

                <Switch>

                    <Route exact path="/" component={HomePage} />



                    <Route exact path="/login" component={Login} />

                    <Route exact path="/register" component={AdminRegister} />


                    {auth ? <Route exact path="/login/dashboard" component={Dashboard}></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/brand" component={BrandPage}></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/category" component={CategoryPage} ></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/category/editcategory/:id" component={UpdateCategory} ></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/product" component={ProductPage} ></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/product/addproduct" component={AddProduct}></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/brand/addbrand" component={AddBrand}></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/brand/editbrand/:id" component={UpdateBrand}></Route> : <Redirect to="/login"></Redirect>}
                    {auth ? <Route exact path="/login/dashboard/category/addcategory" component={AddCategory}></Route> : <Redirect to="/login"></Redirect>}
                    <Route exact path="/*" component={PageNotFound} />

                    


                </Switch>

            </Fragment>
        );
    }
}

export default AppRoute;