import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap'
import '../ErrorPage/PageNotFound.css'
import { Redirect, Link } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
class PageNotFound extends Component {



    onChange=()=>{
        console.log("alert byn")
       return <Redirect to="/" Component={HomePage}></Redirect>
    } 
    render() {


       
        return (
            <Fragment>
                <h1 className="pageNotFoundBackground">Page Not Found</h1>
                <Button variant="danger" ><Link to="/">Home</Link></Button> 
            </Fragment>
        );
    }
}

export default PageNotFound;