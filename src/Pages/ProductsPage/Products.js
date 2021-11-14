import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Container, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link ,useHistory, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import productsBannerImg from '../../Images/2h.jpg';
import Footer from './../../Shared/Footer';

const productsBannerBG = {
    background:`url(${productsBannerImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
}

const Products = () => {
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
        <>
        <Box sx={{ flexGrow: 1}} style={productsBannerBG}>
            <Container sx={{pt:14, pb:8}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h2" color='primary' sx={{fontWeight:"500", fontSize:"45px", py:3}}>Check Our Headphone Collections</Typography>
                </Box>
            </Container>
        </Box>
        <Container>
            <Box sx={{ flexGrow: 1, py:8}}>
                 <Typography variant="h2" color='scondary' sx={{fontWeight:"700", fontSize:"40px", py:4, textAlign:"center"}}>Featured Products</Typography>
                <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                    {
                        products.map(product => <Grid item xs={4} sm={3} md={4} key={product._id}>
                            <Card variant="outlined" sx={{pt:2, height:"100%"}}>
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
                            </Card>
                        </Grid>)
                    }
                </Grid>
            </Box>
        </Container>
        <Footer></Footer>
        </>
    );
};

export default Products;