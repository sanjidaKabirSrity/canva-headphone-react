import React from 'react';
import { Box } from '@mui/system';
import {AppBar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link , useHistory } from 'react-router-dom';
import ErrorImg from '../../Images/no_result.gif';
import Header from '../../Shared/Header';

const NotFoundBG = {
    background:`url(${ErrorImg})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor:'rgb(0 0 0 / 72%)',
    backgroundBlendMode:'darken, luminosity'
}

const NotFound = ({classes, theme}) => {
    const history = useHistory();
    const handleClick =() => {
        history.push('/home')
    }

    return (
        <Box style={NotFoundBG}>
            <Container>
            <Box sx={{py:20, textAlign:"center"}}>
                <Typography variant="h1" color='primary'>404</Typography>
                <Typography variant="h4" color='primary'>Sorry! No result found :( </Typography>
                <Typography variant="h6" color='primary'>We're sorry what you were looking for. Please try another way</Typography>
                <Link to="/home">
                    <Button onClick={handleClick} variant="outlined" sx={{my:3}}>Go Back Home</Button>
                </Link>
            </Box>
        </Container>
        </Box>
    );
};

export default NotFound;