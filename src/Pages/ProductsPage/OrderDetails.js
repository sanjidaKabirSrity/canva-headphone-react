import {
    Button,
    CssBaseline,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import axios from "axios";
  import { useForm } from "react-hook-form";
//   import "./OrderDatails.css";
  import swal from "sweetalert";
import useAuth from "../../Hooks/useAuth";
  
  const OrderDetails = ({ product }) => {
    const { user } = useAuth();
  // console.log(product);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      defaultValues: {
        userName: user?.displayName,
        userEmail: user?.email,
        headphoneName: product?.name,
        price: product.price,
      },
    });
    const onSubmit = (data) => {
      data.status = "pending";
      data.productImg = product?.img;
      axios
        .post("https://young-stream-80360.herokuapp.com/orders", data)
        .then((result) => {
          if (result.data?.insertedId) {
            swal({
                text: "Successfully added an order. Please proceed with payment.",
                icon: "success",
              });
            reset();
          }
        });
    };
    return (
      <>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                    id="standard-name-input"
                    type="text"
                    label="Your Name"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("userName", { required: true })}
                />
                {errors.userName && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                    User Name is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-email-input"
                    type="email"
                    label="Email Address"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("userEmail", { required: true })}
                />
                {errors.userEmail && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                    User Email is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-name-input"
                    type="text"
                    // label="Headphone Name"
                    color="secondary"
                    value={product?.name}
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("headphoneName", { required: true })}
                />
                {/* {errors.headphoneName && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                    Headphone Name is required
                  </Typography>
                )} */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-number-input"
                    type="number"
                    // label="Headphone Price $"
                    value={product?.price}
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("price", { required: true })}
                />
                {/* {
                errors.price && 
                <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                    Price is required
                </Typography>
                } */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-text-input"
                    type="text"
                    label="Address"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    required
                    {...register("address", { required: true })}
                />
                {errors.address && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                    Address is required
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-text-input"
                    type="text"
                    label="City"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    required
                    {...register("city", { required: true })}
                />
                {errors.city && 
                <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                City is required
              </Typography>
                }
              </Grid>
              <Button 
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    sx={{my:2, fontSize: 16, fontWeight:600, py:1, width:"100%" }}
                >
                    Place Order
                </Button>
            </Grid>
          </Box>
        {/* </Box> */}
      </>
    );
  };
  
  export default OrderDetails;