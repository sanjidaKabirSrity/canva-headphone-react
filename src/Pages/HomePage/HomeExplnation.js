import { Box } from '@mui/system';
import { Button, Container, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';
import ExplanationImg from '../../Images/2.jpg'

const HomeExplnation = () => {
    return (
        <Box sx={{ flexGrow: 1}} sx={{bgcolor:"#F9F9F9"}}>
            <Container sx={{py:8}}>
            <Grid container spacing={{ xs: 0, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }} sx={{alignItems:"center"}}>
                <Grid item xs={4} sm={3} md={9}>
                    <img src={ExplanationImg} alt="" style={{width:"100%"}} />
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                    <Paper elevation={0} sx={{bgcolor:"#FFFFFF", py:5, px:3, ml:{xs:"none",sm:"none",md:"-180px"}}}>
                        <Typography variant="h3" color='secondary' sx={{fontWeight:"600", fontSize:"28px", textDecoration:"underline", pb:3}}>SoundLink Revolve Bluetooth</Typography>
                        <Typography variant="body1" color='info.main' sx={{fontSize:"16px"}}>The sound link revolves Bluetooth speaker from Bose is engineered to deliver deep, loud and immersive sound in every direction. Bose SoundLink Revolve Portable Bluetooth Speaker – Wireless Water-Resistant Speaker with 360° Sound</Typography>
                        <Button variant="outlined" color="secondary" sx={{fontWeight:"600", mt:3}}>View Details</Button>
                    </Paper>
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default HomeExplnation;