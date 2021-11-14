import {
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ManageAProduct from "./ManageAProduct/ManageAProduct";
import swal from "sweetalert";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(products)

  const history = useHistory();

 

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "get",
      url: `https://young-stream-80360.herokuapp.com/products`,
      
    }).then((result) => {
      // console.log(result.data)
      setProducts(result.data);
      setIsLoading(false);
    });
  }, []);

  // handledelte
  const handleDelete = (id) => {
    // confirmAlert({
    //   message: "Are you sure want to delete?",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => {
      const proceed = window.confirm("Are you sure want to delete?");
      if(proceed){
        axios
              .delete(`https://young-stream-80360.herokuapp.com/products/${id}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  history.replace("/dashboard");
                  const remaining = products.filter((event) => event._id !== id);
                  setProducts(remaining);
                  swal({
                    title: "Headphone deleted",
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
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  return (
    <Box
      className="result"
      style={{ marginRight: 0 }}
      sx={{ py: 2, px: 0, mx: 0 }}
    >
      <Typography
        sx={{ textAlign: "center", pb: 2 }}
        variant="h4"
        color="secondary"
      >
        Manage Products
      </Typography>
      <Divider />
      {/* products  */}
      <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={{ xs: 3, sm:3, md: 5 }} columns={{ xs: 4, sm: 6, md: 12 }}>
      {
        products.map(product => <ManageAProduct
          key={product._id}
          product={product}
          handleDelete={handleDelete}
        />)
    }
      </Grid>
      </Box>
    </Box>
  );
};

export default ManageProducts;
