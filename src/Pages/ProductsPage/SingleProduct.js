import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import productBannerImg from '../../Images/3h.jpg';

const productBannerBG = {
    background:`url(${productBannerImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
}

const SingleProduct = () => {
    const { productId } = useParams();

    const [product , setProduct] = useState([]);
    useEffect(()=> {
        fetch(`https://young-stream-80360.herokuapp.com/products/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productId])

    return (
        <>
        <Box sx={{ flexGrow: 1}} style={productBannerBG}>
            <Container sx={{pt:14, pb:8}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h2" color='primary' sx={{fontWeight:"500", fontSize:"45px", py:3}}>Your Choosing Headphone</Typography>
                </Box>
            </Container>
        </Box>
        <Container>
            <Box sx={{ flexGrow: 1, py:5}}>
                <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
                    <Grid item xs={4} sm={3} md={6}>
                        <Paper variant="outlined" sx={{py:2, px:3}}>
                            <img src={product.img} alt="" style={{width:"100%"}} />
                            <Box sx={{display:"flex", justifyContent:"space-between", py:1}}>
                                <Typography variant="h4" color='secondary' sx={{fontWeight:600}}>{product.name}</Typography>
                                <Typography variant="h5" color='info.main' sx={{}}>{product.price}$</Typography>
                            </Box>
                            <Typography variant="body1" color='secondary' sx={{fontSize:"18px"}}>{product.description}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} sm={3} md={6}></Grid>
                </Grid>
            </Box>
        </Container>
        </>
    );
};

export default SingleProduct;