import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Rating from "@mui/material/Rating";


// reviews section

const Reviews = () => {
  const [clientReviews, setClinetReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://young-stream-80360.herokuapp.com/reviews")
      .then((result) => {
        setClinetReviews(result.data);
        setIsLoading(false);
      });
  }, []);

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F9F9F9" }}>
      <Container sx={{ py: 6 }}>
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{textAlign:"center"}}>What Our Clients Say</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, my: 2, pb:2, textAlign:"center"}}>
                Client Reviews
            </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
              {
                  clientReviews.map(clientReview => <Grid item xs={2} sm={8} md={3} sx={{ py: 2 }}>
                        <Paper
                            sx={{ px: 3, py: 2, height:"100%", borderRadius: 2, textAlign: "center" }}
                            elevation={2}
                        >
                            <Typography variant="h5" color="secondary">
                            {clientReview.userName} 
                            </Typography>
                            <Typography sx={{ mb: 1 }} variant="body1" color="info.main">
                            {clientReview.email}
                            </Typography>
                            <Typography color="text.secondary" paragraph>
                            {clientReview.review.slice(0, 80)}
                            </Typography>
                            <Rating
                            name="half-rating-read"
                            defaultValue={clientReview.rating}
                            precision={0.5}
                            readOnly
                            />
                        </Paper>
                    </Grid>)
              }
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Reviews;
