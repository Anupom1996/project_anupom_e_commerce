import React, { Component, Fragment } from 'react';
import {Container,Col,Row,Carousel} from 'react-bootstrap';
import '../../asset/css/custom.css'
import '../../asset/css/bootstrap.min.css'
import anupom from '../../asset/image/anupom.jpg'
import rohan from '../../asset/image/rohan.jpg'
import krish from '../../asset/image/krish.jpg'
import anupom2 from '../../asset/image/anupom2.jpeg'
import '../CarouselPart/carousal.css'

// react slict file import

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
class carousel extends Component {
    render() {

        var settings = {
            autoplay:true,
            autoplaySpeed:2000,
            dots: true,
            infinite: true,
            speed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical:true,
            verticalSwinping:true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };




        
        return (
            <Fragment>
                 <h1 className="serviceTitle">Worker's Says</h1>
                <Container>
                    <Slider  {...settings}>
                        <div>
                            <Row className="text-center justify-content-center">
                                <Col lg={6} md={6} sm={12}>

                                    <img className="carousalImage" src={anupom2}></img>
                                    <h1 className="carousalTitle">Software Developer</h1>
                                    <h5 className="carousalSubTitle">Anupom Das</h5>
                                    <p className="carousalParagraph"> 
                                        <span>
                                             Work  at IndusNet Technology.This is my project.
                                        I think so This is too much good project
                                        </span>
                                       
                                    </p>

                                </Col>

                            </Row>
                        </div>


                        <div>
                            <Row className="text-center justify-content-center">
                                <Col lg={6} md={6} sm={12}>

                                    <img className="carousalImage" src={krish}></img>
                                    <h1 className="carousalTitle">Software Developer</h1>
                                    <h5 className="carousalSubTitle">Krishnendu Sakhar Das</h5>
                                    <p className="carousalParagraph"> 
                                        <span>
                                       Work at IndusNet Technology
                                        Tech Lead Of Indusnet Technology.
                                        it is very good project 
                                        </span>
                                        
                                    </p>

                                </Col>

                            </Row>
                        </div>

                        <div>
                            <Row className="text-center justify-content-center">
                                <Col lg={6} md={6} sm={12}>

                                    <img className="carousalImage" src={rohan}></img>
                                    <h1 className="carousalTitle">Software Developer</h1>
                                    <h5 className="carousalSubTitle">Souvik Mallick</h5>
                                    <p className="carousalParagraph"> 
                                        <span>
                                        Work at IndusNet Technology .....
                                        As a software devoloper
                                        This is too much good project       
                                        </span>
                                       
                                    </p>

                                </Col>

                            </Row>
                        </div>
                    </Slider>
                </Container>
            </Fragment>
        )  
    }
}

export default carousel;
