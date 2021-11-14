import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";

const ManageAProduct = ({ product, handleDelete }) => {
  const { _id, name, img, price } = product;

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <Grid item xs={4} sm={3} md={4}>
        <Card variant="outlined" sx={{pt:2, height:"100%"}}>
          <CardMedia
          component="img"
          sx={{width:"50%", mx:"auto"}}
          image={img}
              alt={name}
          />
          <CardContent sx={{textAlign:"center"}}>
              <Typography variant="h5" color='secondary' sx={{py:1}}>
                  {name}
              </Typography>
              <Typography variant="body1" color="info.main" sx={{ fontSize: 16 }}>
                 $ {price}
              </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <ButtonGroup variant="contained" sx={{boxShadow:"none"}}>
              <Button 
                  variant="outlined"
                  color="secondary"
                  sx={{py:1, mb:1, width:"100%" }}
                  onClick={() => handleModalOpen(_id)}
              >
                  Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{py:1, mb:1, width:"100%" }}
                onClick={() => handleDelete(_id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      {/* modal  */}
      <UpdateProductModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        headphone={product}
      />
    </>
  );
};

export default ManageAProduct;
