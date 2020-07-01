import React, { Component ,Fragment} from 'react';
import { NavDropdown, Nav, Navbar,Form,FormControl } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import Product from '../../asset/image/product.png'
import '../product/ProductNavBar.css'
class ProductNavbar extends Component {
    render() {
        return (
            <div>
                <Fragment>
                           <Navbar collapseOnSelect expand="lg" className="avBarBackground-color" variant="dark">
                    <Navbar.Brand href="#home"><img className="brandlImage" src={Product}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/brand" >AddProduct</NavLink></Nav.Link>
                        
                            {/* <NavDropdown className="navBar-title" title="AllList" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">ShowProduct</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">AddProduct</NavDropdown.Item>
                                <NavDropdown.Divider />
                                
                                
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Product" className="mr-sm-2" />
                            <Button variant="outline-primary">Search</Button>
                            </Form>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
            </div>
        );
    }
}

export default ProductNavbar;