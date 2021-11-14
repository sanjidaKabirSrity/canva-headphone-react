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
// import { toast } from "react-toastify";
import swal from "sweetalert";

const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    axios({
      method: "put",
      url: "https://young-stream-80360.herokuapp.com/users/admin",
      
      data: data,
    }).then((result) => {
      if (result.data?.modifiedCount > 0) {
        // toast.success("Admin made successfully");
        swal({
          title: "Admin made successfully",
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
        Make Admin
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          marginX: "auto",
          width: "50%",
          py: 3,
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                    type="email"
                    fullWidth
                    required
                    label="User Email"
                    variant="standard"
                    color="secondary"
                    {...register("email", { required: true })}
                  />
              {errors.email && (
                <span className="error">Admin Name is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button 
                  variant="outlined"
                  type="submit"
                  color="secondary"
                  sx={{ fontSize: 16, fontWeight:600, py:1, width:"100%" }}
              >
                   Make Admin
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MakeAdmin;
