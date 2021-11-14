import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    axios
      .post("https://young-stream-80360.herokuapp.com/products", data)
      .then((result) => {
        if (result.data?.insertedId) {
          swal({
            title: "Headphone added successfully!",
            icon: "success",
          });
          reset();
        }
      });
  };
  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Add a Headphone
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
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
                id="standard-text-input"
                type="text"
                required
                label="Headphone Name"
                color="secondary"
                variant="standard"
                sx={{ width:1, mb:4, fontSize: "18px"}}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                Headphone Name is required
              </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="standard-text-input"
                type="text"
                required
                multiline
                label="Headphone Description"
                {...register("description", { required: true })}
                color="secondary"
                variant="standard"
                sx={{ width:1, mb:4, fontSize: "18px"}}
              />
              {errors.description && (
                <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                Headphone description is required
              </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-number-input"
                type="number"
                required
                label="product Price"
                {...register("price", { required: true })}
                color="secondary"
                variant="standard"
                sx={{ width:1, mb:4, fontSize: "18px"}}
              />
              {errors.price && 
              <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
              Price is required
            </Typography>
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-url-input"
                type="url"
                required
                label="product Image"
                helperText="Upload the image to imgbb or wherever you want and submit the live link."
                {...register("img", { required: true })}
                color="secondary"
                variant="standard"
                sx={{ width:1, mb:4, fontSize: "18px"}}
              />
              {errors.img && (
                <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                Headphone Image is required
              </Typography>
              )}
            </Grid>

            <Button 
                variant="outlined"
                type="submit"
                color="secondary"
                sx={{my:2, fontSize: 16, fontWeight:600, py:1, width:"100%" }}
            >
                Add
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AddProduct;
