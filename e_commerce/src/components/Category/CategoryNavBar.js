import React, { Component ,Fragment} from 'react';
import { NavDropdown, Nav, Navbar,Form,FormControl } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import Category from '../../asset/image/category.png'
import '../Category/CategoryNavBar.css'
import axios from 'axios'
class CategoryNavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            query:'',
            Category:[]
        }
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.Serach=this.Serach.bind(this)
    }
    Serach=(event)=>{
        event.preventDefault();
        console.log("asd")
        console.log(this.state.query)
        axios.get('http://localhost:3050/categorySearch/'+this.state.query)
        .then(res=>{
            console.log(res)
            this.setState({
                Category: res.data.categoryData,

            })
           
            this.props.onSearch(this.state.Category);
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
        return (
            
            <Fragment>
                           <Navbar collapseOnSelect expand="lg" className="navBarBackground-color" variant="dark">
                    <Navbar.Brand href="#home"><img className="brandlImage" src={Category}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        {/* <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/brand" >Brand</NavLink></Nav.Link>
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/Product" >Product</NavLink></Nav.Link>
                        <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/Category" >Category</NavLink></Nav.Link> */}
                            {/* <NavDropdown className="navBar-title" title="AllList" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">ShowCategory</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2">AddCategory</NavDropdown.Item>
                                <NavDropdown.Divider />
                                
                                
                            </NavDropdown> */}
                            <Nav.Link><NavLink exact activeStyle={{color:'#00a8ee'}} to="/login/dashboard/category/addcategory" >AddCategory</NavLink></Nav.Link>
                        </Nav>
                        <Nav>
                            
                        <Form inline>
                            <FormControl type="text" placeholder="Search Category" className="mr-sm-2"  name="query" value={query} onChange={this.onChangeHandler}/>
                            <Button variant="outline-primary" onClick={this.Serach}>Search</Button>
                            </Form>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

export default CategoryNavBar;