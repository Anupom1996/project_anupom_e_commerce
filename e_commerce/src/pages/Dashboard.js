import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
class Dashboard extends Component {

    constructor()
    {
        super();
        this.state={
            
        }
    }

   

    render() {
       
        return (
            <Fragment>
                <Dashboard_navBar></Dashboard_navBar>
                <h1>my name is anupom das</h1>
                
            </Fragment>
        );
    }
}

export default Dashboard;