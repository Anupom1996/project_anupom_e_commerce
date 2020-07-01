import React, { Component, Fragment } from 'react';
import { NavDropdown, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import './Dashboard_navBar.css'
class Dashboard_navBar extends Component {

    constructor()
    {
        super();
        this.state={
            logout:false
        }
    }

    Logout=()=>{
        
       console.log(localStorage.getItem('auth'))
        localStorage.clear('token')
        this.setState({
            logout:true
        })
        
    }


    render() {
        const {logout}=this.state
        if(logout)
        {
            return <Redirect to="/"></Redirect>
        }
        return (
            
            <Fragment>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/brand" >Brand</NavLink></Nav.Link>
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/Product" >Product</NavLink></Nav.Link>
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/Category" >Category</NavLink></Nav.Link>
                            {/* <NavDropdown title="AllList" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Brand</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">Category</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.3">Product</NavDropdown.Item>
                                
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            
                            <Button variant="danger" onClick={this.Logout}>Logout</Button> 
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

export default Dashboard_navBar;