import { Container, Grid, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeProducts = () => {
    const [products , setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetch('https://young-stream-80360.herokuapp.com/products').then(res => res.json()).then(data => {
            setProducts(data);
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
                 <Typography variant="h2" color='scondary' sx={{fontWeight:"700", fontSize:"40px", py:4, textAlign:"center"}}>Featured Products</Typography>
                <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                    {
                        products.slice(0, 6).map(product => <Grid item xs={4} sm={3} md={4} key={product._id}>
                            {product._id && <Card variant="outlined" sx={{pt:2, height:"100%"}}>
                                <CardMedia
                                component="img"
                                sx={{width:"50%", mx:"auto"}}
                                image={product.img}
                                alt="green iguana"
                                />
                                <CardContent sx={{textAlign:"center"}}>
                                    <Typography variant="h5" color='secondary' sx={{py:1}}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body1" color="info.main" sx={{ fontSize: 16, pb:1 }}>
                                        {product.description.slice(0,33)}...
                                    </Typography>
                                    <Box sx={{display:"flex", justifyContent:"space-around", py:1}}>
                                        <Typography variant="h5" color='secondary' sx={{}}>{product.price}$</Typography>
                                        <Link to={`/products/${product._id}`} style={{textDecoration:"none"}}>
                                            <Button variant="outlined" color="secondary" sx={{}}>Buy Now</Button>
                                        </Link>
                                    </Box>
                                </CardContent>
                            </Card>}
                        {!product._id && <CircularProgress color="inherit" />}
                        </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Container>
    );
};

export default HomeProducts;