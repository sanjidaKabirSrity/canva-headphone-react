import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import HeadphoneModal from "../HeadphoneModal/HeadphoneModal";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState({});
  const [orderId, setOrderId] = useState("");
  console.log(order)

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = (id) => {
    setOrderId(id);
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://young-stream-80360.herokuapp.com/allOrders/${id}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }).then((result) => {
      setOrder(result.data);
      setIsLoading(false);
    });
    // open modal
    setModalOpen(true);
  };

  const handleModalClose = () => setModalOpen(false);

  // load orders
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://young-stream-80360.herokuapp.com/allOrders",
      
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, [order?.status]);

  // handleCancel
  const handleCancel = (id) => {
    // confirmAlert({
    //   message: "Are you sure want to delete?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
      const proceed = window.confirm("Are you sure want to Delete?");
      if(proceed){
        axios
              .delete(`https://young-stream-80360.herokuapp.com/orders/${id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  const remaining = orders.filter((event) => event._id !== id);
                  setOrders(remaining);
                  swal({
                    title: "Order Canceled",
                    icon: "info",
                  });
                }
              });
      }
            
          // },
        // },
        // {
        //   label: "No",
        //   onClick: () => {
        //     return;
        //   },
        // },
      // ],
    // });
  };

  // loading spinner
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <>
      <Box
        className="result"
        style={{ marginRight: 0 }}
        sx={{ py: 2, px: 0, mx: 0 }}
      >
        <Typography
          sx={{ textAlign: "", pb: 2 }}
          variant="h4"
          color="secondary"
        >
          Manage All Orders
        </Typography>
        <Divider />
        <TableContainer sx={{ my: 3 }} component={Paper}>
          <Table sx={{}} aria-label="Appointment table">
            <TableHead sx={{ bgcolor: "#333" }}>
              <TableRow>
                <TableCell align="left" style={{color:"#ffff"}}>Email</TableCell>
                <TableCell style={{color:"#ffff"}}>Headphone Name</TableCell>
                <TableCell style={{color:"#ffff"}}>Address</TableCell>
                <TableCell style={{color:"#ffff"}}>Price</TableCell>
                <TableCell style={{color:"#ffff"}}>Status</TableCell>
                <TableCell style={{color:"#ffff"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow
                  hover
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* {row.userName} */}
                    {row.userEmail}
                  </TableCell>
                  <TableCell>{row.headphoneName}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>$ {row.price}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <ButtonGroup variant="text">
                      <Button
                        onClick={() => handleCancel(row._id)}
                        sx={{ color: "#333" }}
                        variant="text"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleModalOpen(row._id)}
                        sx={{ color: "#333" }}
                        variant="text"
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* modal  */}
      <HeadphoneModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        order={order}
        orderId={orderId}
      ></HeadphoneModal>
    </>
  );
};

export default ManageAllOrders;
