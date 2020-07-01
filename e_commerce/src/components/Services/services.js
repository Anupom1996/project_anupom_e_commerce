import React, { Component, Fragment } from 'react';
import { Container, Row, Col ,Card,Button} from 'react-bootstrap';
import anupom from '../../asset/image/anupom.jpg'
import rohan from '../../asset/image/rohan.jpg'
import krish from '../../asset/image/krish.jpg'
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'


class services extends Component {
    render() {
        return (
            <Fragment>
                <Container className="text-center">
                    <h1 className="serviceTitle">Project Worker's</h1>
                    <Row>
                        <Col lg={4} md={6} sm={12}>
                            <div className="serviceCard"> 
                            <img src={krish} height="150px" width="150px" class="serviceImage"></img>
                               <h3 className="serviceSubTitle"> About Me</h3>
                               <p className="serviceSubAbout"> 
                                   <span>
                                       Krishnendu Sakhar Das
                                       krish.das@indusnet.co.in
                                       8474859600
                                   </span>
                               </p>
                            </div>
                        </Col>

                        <Col>
                           <div className="serviceCard">
                               <img src={anupom} height="150px" width="150px" class="serviceImage"></img>
                               <h3 className="serviceSubTitle"> About Me</h3>
                               <p className="serviceSubAbout"> 
                               <div>
                                    <span>
                                       Anupom Das
                                       anupom.das@indusnet.co.in
                                       7001496414
                                   </span>
                               </div>
                                   
                               </p>
                           </div>
                        </Col>

                        <Col>
                            <div className="serviceCard">
                            <img src={rohan} height="150px" width="150px" class="serviceImage"></img>
                               <h3 className="serviceSubTitle"> About Me</h3>
                               <p className="serviceSubAbout"> 
                                   <span>
                                       Souvik Mallick
                                       souvik.mallick@indusnet.co.in
                                       7485123650
                                   </span>
                               </p>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default services;