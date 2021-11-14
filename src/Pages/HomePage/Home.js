import React from 'react';
import HomeBanner from './HomeBanner';
import HomeExplnation from './HomeExplnation';
import HomeProducts from './HomeProducts';
import HomeServices from './HomeServices';
import Footer from './../../Shared/Footer';
import Reviews from './Reviews';

const Home = ({classes, theme}) => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeProducts></HomeProducts>
            <HomeExplnation></HomeExplnation>
            <HomeServices></HomeServices>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;