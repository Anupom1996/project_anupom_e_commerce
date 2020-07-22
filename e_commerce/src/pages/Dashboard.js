import React, { Component, Fragment } from 'react';
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import Dashboard_navBar from '../components/Dashboard_navBar/Dashboard_navBar'
class Dashboard extends Component {

    constructor(props)
    {
        super(props);
        this.state={
          user: {}
        }
    }


    componentDidMount(){
        let user = this.props.location.state;
        this.setState({user: user});
    }

    shouldComponentUpdate(props){
        if(this.state.user != this.props.location.state) return true;
    }

  

    render() {
        return (
            <Fragment>
                <Dashboard_navBar></Dashboard_navBar>
                <h1>AdminDetails</h1>
                <h3>{'AdminName Firstname '+this.state.user.AdminFirstName}</h3>
                <h3>{'Admin Lastname '+this.state.user.AdminLastName}</h3> 
                 <h3>{'Admin Phone '+this.state.user.AdminPhone}</h3>
                 <h3>{'AdminEmail '+this.state.user.AdminEmail}</h3>
            </Fragment>
        );
    }
}

export default Dashboard;