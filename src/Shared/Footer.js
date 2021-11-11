import { Container } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import React from 'react';
import footerLogo from "../Images/footer-logo.png"

const Footer = () => {
    return (
        <Box sx={{ flexGrow: 1}}>
            <Container sx={{pb:5}}>
            <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                <Grid item xs={4} sm={3} md={3}>
                    <Box sx={{pt:5}}>
                        <img src={footerLogo} alt="" />
                        <Typography variant="subtitle1" color='secondary'>© 2021 - CANVAS</Typography>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                    <Typography variant="h6" color='secondary' sx={{fontWeight:"700", pb:3, pt:5}}>Features</Typography>
                    <Typography variant="subtitle1" color='secondary'>Cool stuff</Typography>
                    <Typography variant="subtitle1" color='secondary'>Random feature</Typography>
                    <Typography variant="subtitle1" color='secondary'>Team feature</Typography>
                    <Typography variant="subtitle1" color='secondary'>Last time</Typography>
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                    <Typography variant="h6" color='secondary' sx={{fontWeight:"700", pb:3, pt:5}}>Resources</Typography>
                    <Typography variant="subtitle1" color='secondary'>Resource</Typography>
                    <Typography variant="subtitle1" color='secondary'>Resource name</Typography>
                    <Typography variant="subtitle1" color='secondary'>Another resource</Typography>
                    <Typography variant="subtitle1" color='secondary'>Final resource</Typography>
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                    <Typography variant="h6" color='secondary' sx={{fontWeight:"700", pb:3, pt:5}}>About</Typography>
                    <Typography variant="subtitle1" color='secondary'>Team</Typography>
                    <Typography variant="subtitle1" color='secondary'>Locations</Typography>
                    <Typography variant="subtitle1" color='secondary'>Privacy</Typography>
                    <Typography variant="subtitle1" color='secondary'>Terms</Typography>
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default Footer;