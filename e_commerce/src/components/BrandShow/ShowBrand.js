import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs';

import { BsPencilSquare } from 'react-icons/bs';
class ShowBrand extends Component {
    constructor() {
        super();
        this.state = {
            Brands: {},
            array: [],
            list: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3050/ShowBrand')
            .then(res => {
                console.log(res)
                this.setState({
                    Brands: res.data.allBrand,

                })


            })
            .catch(err => {
                console.log("error")
            })
    }

    deleteBrand=()=>{
        alert("delete aaa")
        axios.delete()
        .then(res=>{
            console.log()
        })
        .catch()
    }

    editBrand=()=>{
        alert("edit")
    }
    render() {
        const { Brands } = this.state
        console.log(this.state.Brands)
        // const contents = this.state.Brands.forEach(item => {
        //     //          // change the title and location key based on your API
        //              return <tr>
        //                <td>{item.BrandName}</td> 

        //              </tr>
        //         })
        return (
            <Fragment>
                <div>brandlist</div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>BrandName</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            
                        </tr>
                    </thead>
                     <tbody>
                        { (Brands.length > 0) ? Brands.map( (Brand, index) => {
                        return (
                            <tr key={ index }>
                             <td>{ Brand.BrandName}</td>
                                <td>
                                    <BsFillTrashFill onClick={this.deleteBrand}></BsFillTrashFill>
                                   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                                   <BsPencilSquare onClick={this.editBrand}></BsPencilSquare>
                                </td>
                            </tr>
                            // <tr>
                            //     <td>
                            //         <BsFillTrashFill></BsFillTrashFill>
                            //     </td>
                            // </tr>
                        )
                        }) : <tr><td colSpan="5">Loading...</td></tr> }
                    </tbody>
                </table>
                {/* {
                    Brands.length ?
                        Brands.map(Brand => <div key={Brand.id}>{Brand.BrandName}</div>) : null
                } */}

            </Fragment >
        );
    }
}

export default ShowBrand;


{/* <tbody>
{ (droplets.length > 0) ? droplets.map( (droplet, index) => {
   return (
    <tr key={ index }>
      <td>{ droplet.id }</td>
      <td>{ droplet.name }</td>
      <td>{ droplet.region.slug}</td>
      <td>{ droplet.memory }</td>
      <td>{ droplet.vcpus }</td>
      <td>{ droplet.disk }</td>
    </tr>
  )
 }) : <tr><td colSpan="5">Loading...</td></tr> }
</tbody> */}


// render() {
//     const contents = this.state.data.forEach(item => {
//          // change the title and location key based on your API
//          return <tr>
//            <td>{item.title}</td> 
//            <td>{item.location}</td>
//          </tr>
//     })
//     return (
//        <div className="container">
//          <div className="row">
//             <div className="col-md-6 col-md-offset-5">
//                 <h1 className="title">All Events</h1>
//                 <table>
//                  <tr>
//                    <th>Event title</th>
//                    <th>Event location</th> 
//                  </tr>
//                    {contents}
//                </table>
//             </div>
//          </div>
//        </div>
//      );
//     } 
//    }