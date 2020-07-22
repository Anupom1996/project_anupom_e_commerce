import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
function Dashboard(props) {
    const [userDetail, setUserDetail] = useState({});
    console.log(props)
    const history = useHistory();
    const Logout = () => {
        console.log(localStorage.getItem("auth"));
        localStorage.clear('token');
        history.push("/login")
    }
    
    useEffect(() => setUserDetail(props.location.state), [props.location]);
    return (
        <div>
            this is dashboard page<br></br>
            <Button variant="danger" onClick={Logout}>Logout</Button>
            <h3>{'AdminName Firstname '+userDetail.AdminFirstName}</h3>
                <h3>{'Admin Lastname '+userDetail.AdminLastName}</h3> 
                 <h3>{'Admin Phone '+userDetail.AdminPhone}</h3>
                 <h3>{'AdminEmail '+userDetail.AdminEmail}</h3>
        </div>
    )
}
export default Dashboard;