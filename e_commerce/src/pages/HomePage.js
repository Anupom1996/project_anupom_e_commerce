import React, { Component, Fragment } from 'react';
import TopBanner from '../components/TopBanner/TopBanner';
import Services from '../components/Services/services';
import CarouselPart  from '../components/CarouselPart/carousel';
import HomePageNavigation from '../components/HomePageNavigation/navigation'

class HomePage extends Component {
    render() {
        return (
            <Fragment>
                <HomePageNavigation></HomePageNavigation>
                <TopBanner></TopBanner>

                <Services></Services>
                <CarouselPart></CarouselPart>
            </Fragment>
        );
    }
}

export default HomePage;