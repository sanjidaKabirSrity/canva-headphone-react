import React from 'react';
import { AppBar } from '@mui/material';
import Header from '../../Shared/Header';
import HomeBanner from './HomeBanner';
import HomeExplnation from './HomeExplnation';

const Home = ({classes, theme}) => {
    return (
        <div>
            {/* <Header classes={classes} theme={theme}>
            <AppBar style={{backgroundColor:"transparent"}}></AppBar>
            </Header> */}
            <HomeBanner></HomeBanner>
            <HomeExplnation></HomeExplnation>
        </div>
    );
};

export default Home;