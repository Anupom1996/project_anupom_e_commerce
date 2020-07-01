import React, { Component, Fragment } from 'react';
import {NavDropdown,Nav,Navbar} from 'react-bootstrap'
import {NavLink,Link} from 'react-router-dom'
import indusnetScrolly from '../../asset/image/indusetscroll.png'
import indusnetNotScrolly from '../../asset/image/indusnet.jpeg'
import './navigation.css'
class navigation extends Component {


    constructor()
    {
        super();
        this.state={
            navBarTitle:"navTitle" ,
            navBarLogo:[indusnetScrolly],
            navBarBackgroundColor:"navBarBackgroundColorBeforescrolly",
            navBarItemMenu:"navItemMenuBeforeScroll"
        
            // className now into state and call the state 
        }
    }
    onScroll=()=>{
        if(window.scrollY>100){
            console.log("scrollydown")
            this.setState({navBarTitle:"navTitleScroll",
            navBarLogo:[indusnetNotScrolly],
            navBarBackgroundColor:"navBarBackgroundColorAfterScrolly",
            navBarItemMenu:"navItemMenuAfterScroll"
        })

        }
        else 
        {
            console.log("scrolly")
            this.setState({
            navBarTitle:"navTitle",
            navBarLogo:[indusnetScrolly],
            navBarBackgroundColor:"navBarBackgroundColorBeforescrolly",
            navBarItemMenu:"navItemMenuBeforeScroll"
                            })
        }
    }

    componentDidMount(){
        window.addEventListener('scroll',this.onScroll)
    }

    render() {
        return (
            <Fragment>

                <Navbar fixed="top" className="navBarBackgroundColorBeforescrolly"collapseOnSelect expand="lg"  variant="dark">
                    <Navbar.Brand href="#home" className={this.state.navBarTitle}><img src={this.state.navBarLogo} height="40px" width="60px" className="navBarImage"></img>InduNet Technology</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            
                        </Nav>
                        <Nav>
                           <Nav.Link> <NavLink exact activeStyle={{color:'#00a8ee'}} to="/register"  className={this.state.navBarItemMenu}>REGISTER</NavLink></Nav.Link>
                          
                           <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login" className={this.state.navBarItemMenu}>LOGIN</NavLink></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

export default navigation;