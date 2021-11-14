import { Backdrop, Button, Fade, Grid, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs:"90%",
    sm:"90%",
    md:"50%"
  },
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
};

const UpdateProductModal = ({ modalOpen, handleModalClose, headphone }) => {
  const { _id, name, img, price } = headphone;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      headphoneName: name,
      price: price,
      img: img,
    },
  });
  const onSubmit = (data) => {
    data.price = parseFloat(data.price);
    axios
      .put(`https://young-stream-80360.herokuapp.com/products/${_id}`, data)
      .then((result) => {
        if (result.data?.modifiedCount > 0) {
          swal({
            title: "Product Updated. To see the updated version, please refresh.",
            icon: "info",
          });
          handleModalClose();
        }
      });
  };
  return (
    <>
      <Modal
        keepMounted
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginX: "auto",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="standard-text-input"
                      type="text"
                      label="Headphone Name"
                      color="secondary"
                      variant="standard"
                      sx={{ width:1, mb:4, fontSize: "18px"}}
                      {...register("headphoneName", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="standard-number-input"
                      type="number"
                      label="Headphone Price $"
                      color="secondary"
                      variant="standard"
                      sx={{ width:1, mb:4, fontSize: "18px"}}
                      {...register("price", { required: true })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-url-input"
                      type="url"
                      label="Headphone Image"
                      helperText="Upload the image to imgbb or wherever you want and submit the live link."
                      color="secondary"
                      variant="standard"
                      sx={{ width:1, mb:4, fontSize: "18px"}}
                      {...register("img", { required: true })}
                    />
                  </Grid>
                  <Button 
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    sx={{my:2, fontSize: 16, fontWeight:600, py:1, width:"100%" }}
                  >
                        Update Headphone
                    </Button>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
