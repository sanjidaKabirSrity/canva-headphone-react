import { Box } from '@mui/system';
import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import banner from '../../Images/1.jpg';
import { Link } from 'react-router-dom';

const bannerBG = {
    background:`url(${banner})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
}

const HomeBanner = () => {
    return (
        <Box sx={{ flexGrow: 1}} style={bannerBG}>
            <Container sx={{pt:14, pb:8}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h6" color='primary' sx={{fontWeight:"500", py:3}}>NEW ARRIVAL</Typography>
                    <Typography variant="h1" color='primary' sx={{fontWeight:"500", fontSize:"50px", py:3}}>Noise Cancelling Wireless Headphones</Typography>
                    <Link to="/products" style={{textDecoration:"none"}}>
                        <Button variant="outlined" sx={{my:3}}>Explore</Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default HomeBanner;