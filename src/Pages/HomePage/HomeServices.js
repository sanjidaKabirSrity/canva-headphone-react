import { Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

const HomeServices = () => {
    const [services , setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetch('https://young-stream-80360.herokuapp.com/services').then(res => res.json()).then(data => {
            setServices(data);
            setIsLoading(false);
        });
    } , []);

    if (isLoading) {
        return (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CircularProgress color="secondary" />
          </Box>
        );
      }

    return (
        <Container>
            <Box sx={{ flexGrow: 1, py:8}}>
                 <Typography variant="h2" color='scondary' sx={{fontWeight:"700", fontSize:"40px", py:4, textAlign:"center"}}>Our Services</Typography>
                <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                    {
                        services.map(service => <Grid item xs={4} sm={3} md={4}key={service._id}>
                            <Paper elevation={0} sx={{p:4}}>
                                <i className={service.icon} color="secondary" style={{fontSize:"40px"}}></i>
                                <Typography variant="h4" color='scondary' sx={{fontWeight:"500", fontSize:"20px", py:2}}>{service.item}</Typography>
                                <Typography variant="body1"  color='info.main' sx={{fontWeight:"500", fontSize:"16px"}}>{service.description}</Typography>
                            </Paper>
                        </Grid>)
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default HomeServices;