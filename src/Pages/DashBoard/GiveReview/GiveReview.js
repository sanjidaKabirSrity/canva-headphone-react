import {
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import swal from "sweetalert";
import useAuth from "../../../Hooks/useAuth";

const GiveReview = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName,
      email: user?.email,
    },
  });
  const onSubmit = (data) => {
    axios
      .post("https://young-stream-80360.herokuapp.com/reviews", data)
      .then((result) => {
        if (result.data?.insertedId) {
          // toast.success("Thanks for your review. 😍");
          swal({
            title: "Thanks for your review. 😍",
            icon: "success",
          });
          reset();
        }
      });
  };
  return (
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Give Review About Canvas
      </Typography>
      <Divider />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            marginX: "auto",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  required
                  label="Your Name"
                  variant="standard"
                  color="secondary"
                  {...register("userName", { required: true })}
                />
                {errors.userName && (
                  <span className="error">User Name is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  fullWidth
                  required
                  label="Email Address"
                  variant="standard"
                  color="secondary"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">User Email is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  fullWidth
                  label="Review"
                  variant="standard"
                  color="secondary"
                  required
                  multiline
                  {...register("review", { required: true })}
                />
                {errors.review && (
                  <span className="error" style={{color:"red"}}>Review is required</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  label="Rating Number"
                  helperText="give rating within 5 star"
                  variant="standard"
                  color="secondary"
                  required
                  multiline
                  {...register("rating", { required: true })}
                />
                {errors.review && (
                  <span className="error" style={{color:"red"}}>Review is required</span>
                )}
              </Grid>
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Give Review
              </Button> */}
              <Button 
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  sx={{fontSize:16, fontWeight:600, py:1, width:"100%" }}
              >
                  Give Review
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default GiveReview;
