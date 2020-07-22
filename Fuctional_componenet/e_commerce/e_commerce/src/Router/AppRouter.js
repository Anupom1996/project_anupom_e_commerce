import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../Component/Login/Login'
import Home from '../Component/Home/Home'
import Dashboard from '../Component/Dashboard/Dashboard';
import PageNotFound from '../Component/PageNotFound/PageNotFound';
function AppRouter() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    
    return (

        <Fragment>

            <switch>

                <Route exact path="/" component={Home}></Route>
                <Route exact path="/login" component={Login}></Route>
                {auth ? <Route exact path="/login/dashboard" component={Dashboard}></Route> : <Redirect to="/login"></Redirect>}
                <Route exact path="/error" component={PageNotFound}></Route>

            </switch>
        </Fragment>
    )
}
export default AppRouter;