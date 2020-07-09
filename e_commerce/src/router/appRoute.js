import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router,Route,Switch}  from 'react-router-dom'
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
class AppRoute extends Component {
    render() {
        return (
            <Fragment>

                <Switch>

                    <Route exact path="/" component={HomePage}/>

                   

                    <Route exact path="/login" component={Login}/>

                    <Route exact path="/register" component={AdminRegister}/>
                        
                  
                    <Route exact path="/login/dashboard" ><AuthGuard cmp={Dashboard}/></Route>
                    <Route exact path="/login/dashboard/brand" ><AuthGuard cmp={BrandPage}/></Route>
                    <Route exact path="/login/dashboard/category" ><AuthGuard cmp={CategoryPage}/></Route>
                    <Route exact path="/login/dashboard/product" ><AuthGuard cmp={ProductPage}/></Route>
                    <Route exact path="/login/dashboard/product/addproduct" ><AuthGuard cmp={AddProduct}/></Route>
                    <Route exact path="/login/dashboard/brand/addbrand" ><AuthGuard cmp={AddBrand}/></Route>
                    <Route exact path="/login/dashboard/brand/editbrand" ><AuthGuard cmp={UpdateBrand}/></Route>
                    <Route exact path="/login/dashboard/category/addcategory" ><AuthGuard cmp={AddCategory}/></Route>
                    <Route exact path="/*" component={PageNotFound}/>

                    


                </Switch>

            </Fragment>
        );
    }
}

export default AppRoute;