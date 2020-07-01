import React, { Component, Fragment } from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
class TopBanner extends Component {
    render() {
        return (
           <Fragment>
               <Container fluid={true} className="topFixedBanner p-0">
                <div className="topBannerOverlay">
                    <Container className="topContain">
                        <Row>
                            <Col>
                                <h1 className="topTitle"> E-Commerce Project</h1>
                                    <h3 className="topSubTitle">MERN Technology</h3>
                            </Col>
                        </Row>

                    </Container>
                </div>
               </Container>
           </Fragment>
        );
    }
}

export default TopBanner;