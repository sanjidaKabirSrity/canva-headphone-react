import React from 'react';
import HomeBanner from './HomeBanner';
import HomeExplnation from './HomeExplnation';
import HomeProducts from './HomeProducts';
import HomeServices from './HomeServices';

const Home = ({classes, theme}) => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <HomeProducts></HomeProducts>
            <HomeExplnation></HomeExplnation>
            <HomeServices></HomeServices>
        </div>
    );
};

export default Home;