import React, { Component ,Fragment} from 'react';
import { NavDropdown, Nav, Navbar,Form,FormControl } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import Product from '../../asset/image/product.png'
import '../product/ProductNavBar.css'
import axios from 'axios'
class ProductNavbar extends Component {
    constructor(props){
        super(props);
        this.state={
            query:'',
            Product:[]
        }
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.Search=this.Search.bind(this)
    }
    Search=(event)=>{
        event.preventDefault();
        console.log("asd")
        console.log(this.state.query)
        axios.get('http://localhost:3050/Search/Product/'+this.state.query)
        .then(res=>{
            console.log(res)
            this.setState({
                Product: res.data.Product,

            })
           
            this.props.onSearch(this.state.Product);
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    onChangeHandler=(event)=>{
        const query=event.target.value
        console.log(query)
        this.setState({
            query:query
        })
    }
    render() {
        const {query,Brand}=this.state
        return (
            <div>
                <Fragment>
                           <Navbar collapseOnSelect expand="lg" className="avBarBackground-color" variant="dark">
                    <Navbar.Brand href="#home"><img className="brandlImage" src={Product}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/product/addproduct" >AddProduct</NavLink></Nav.Link>
                        
                            
                        </Nav>
                        <Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search Product" className="mr-sm-2" name="query" value={query} onChange={this.onChangeHandler}/>
                            <Button variant="outline-primary"onClick={this.Search}>Search</Button>
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