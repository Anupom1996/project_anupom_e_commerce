import React, { Component, Fragment } from 'react';
import { NavDropdown, Nav, Navbar,Form,FormControl } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import brand from '../../asset/image/brand.jpeg'
import './BrandNavBar.css'
import axios from 'axios'
class BrandNavBar extends Component {

    constructor(){
        super();
        this.state={
            query:'',
            Brand:[]
        }
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.Serach=this.Serach.bind(this)
    }
    Serach=(event)=>{
        event.preventDefault();
        console.log("asd")
        console.log(this.state.query)
        axios.get('http://localhost:3050/SearchBrand/'+this.state.query)
        .then(res=>{
            console.log(res)
            this.setState({
                Brand: res.data.allBrand,

            })


        })
        .catch(err=>{
            console.log(err)
        })
    }
    onChangeHandler=(event)=>{
        const query=event.target.value
        this.setState({
            query:query
        })
    }
    render() {
        const {query,Brand}=this.state
        console.log(this.state.query)
        return (
            
            <Fragment>
                           <Navbar collapseOnSelect expand="lg" className="avBarBackground-color" variant="dark">
                    <Navbar.Brand href="#home"><img className="brandlImage" src={brand}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/brand/addbrand" >AddBrand</NavLink></Nav.Link>
                     
                            
                        </Nav>
                        <Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Brand" className="mr-sm-2" name="query" value={query} onChange={this.onChangeHandler} />
                            <Button variant="outline-primary" onClick={this.Serach}>Search</Button>
                            </Form>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {/* <div>brandlist</div>
                {
                    Brand.length ?
                        Brand.map(Brands => <div key={Brands.id}>{Brands.BrandName}</div>) : null
                } */}
            </Fragment>
        );
    }
}

export default BrandNavBar;

