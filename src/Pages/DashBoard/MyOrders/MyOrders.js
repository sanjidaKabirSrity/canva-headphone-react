import {
  Button,
  CircularProgress,
  Container,
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
import CancelIcon from "@mui/icons-material/Cancel";
// import { confirmAlert } from "react-confirm-alert";
// import { toast } from "react-toastify";
import swal from "sweetalert";
import useAuth from "../../../Hooks/useAuth";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // load ordes by email
  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://young-stream-80360.herokuapp.com/orders?email=${user?.email}`,
      
    }).then((result) => {
      setOrders(result.data);
      setIsLoading(false);
    });
  }, [user?.email]);

  // handleCancel
  const handleCancel = (id) => {
    // confirmAlert({
    //   message: "Are you sure want to cancel?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
      const proceed = window.confirm("Are you sure want to cancel?");
      if(proceed){
        axios
              .delete(`https://young-stream-80360.herokuapp.com/orders/${id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  const remaining = orders.filter((event) => event._id !== id);
                  setOrders(remaining);
                  // toast.info("Order Canceled");
                  swal({
                    title: "Order Canceled",
                    icon: "info",
                  });
                }
              });
      }
            
    //       },
    //     },
    //     {
    //       label: "No",
    //       onClick: () => {
    //         return;
    //       },
    //     },
    //   ],
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
    <Container sx={{ py: 2 }}>
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        My Orders
      </Typography>
      <Divider />
      <TableContainer sx={{ my: 3 }} component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="Appointment table">
          <TableHead sx={{ bgcolor: "#333" }}>
            <TableRow>
              <TableCell align="left" style={{color:"#ffff"}}>Name</TableCell>
              <TableCell align="center" style={{color:"#ffff"}}>Headphone Name</TableCell>
              <TableCell align="center" style={{color:"#ffff"}}>Address</TableCell>
              <TableCell align="center" style={{color:"#ffff"}}>Price</TableCell>
              <TableCell align="center" style={{color:"#ffff"}}>Status</TableCell>
              <TableCell align="center" style={{color:"#ffff"}}>Actions</TableCell>
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
                  {row.userName}
                </TableCell>
                <TableCell align="center">{row.headphoneName}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">$ {row.price}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleCancel(row._id)}
                    sx={{ color: "#ff1654" }}
                    variant="text"
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyOrders;
