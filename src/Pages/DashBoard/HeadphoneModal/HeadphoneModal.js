import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs:"90%",
    sm:"90%",
    md:"40%"
  },
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  p: 4,
};

const HeadphoneModal = ({ modalOpen, handleModalClose, order, orderId }) => {
  const { headphoneName, productImg, status } = order;

  const [changeStatus, setChangeStatus] = useState("");

  const handleChange = (e) => {
    setChangeStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    if (changeStatus === "") {
      order.status = "pending";
    } else {
      order.status = changeStatus;
    }
    axios
      .put(
        `https://young-stream-80360.herokuapp.com/allOrders/${orderId}`,
        order
      )
      .then((result) => {
        console.log(result);
        if (result.data?.modifiedCount > 0) {
          swal({
            title: "Status Updated",
            icon: "info",
          });
          handleModalClose();
        }
      });
    e.preventDefault();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{border:0}}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box sx={{ textAlign:"center"}}>
              <img style={{ width: "50%"}} src={productImg} alt="" />
            </Box>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {headphoneName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ my: 2 }}>
              {status}
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                {/* <TextField
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={currency}
                  onChange={handleChange}
                  helperText="Please select your currency"
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}


                  <InputLabel id="demo-simple-select-label">
                    Change Status
                  </InputLabel>
                  <Select
                    id="demo-simple-select"
                    value={changeStatus}
                    label="Change Status"
                    color="primary"
                    onChange={handleChange}
                  >
                    <MenuItem value="approved">Approve</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="rejected">Reject</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                >
                  Update
                </Button>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HeadphoneModal;
