import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ItemCard = ({ item }) => {
  const handleEdit = (item) => {
    // Make PUT request to update the ad with the given id
    fetch(`${process.env.REACT_APP_API_BASE_URL}/ad/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        // Include updated data for the ad in the request body
        // For example: { productName: "New product name" }
      }),
    })
      .then((res) => {
        // Handle response from the server
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (item) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If user clicked 'OK' in the dialog, make the DELETE request
    if (confirmDelete) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/ad/${item._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          // Handle response from the server
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card sx={{ width: 300, margin: 10 }}>
      <CardContent>
        <Typography variant="h6">{item.productName}</Typography>
        <Typography variant="subtitle1">{item.description}</Typography>
        <Typography variant="subtitle2">
          Base Price: {item.basePrice.$numberDecimal}
        </Typography>
        <Typography variant="subtitle2">
          Current Price: {item.currentPrice.$numberDecimal}
        </Typography>
        <Typography variant="subtitle2">Category: {item.category}</Typography>
        <Button onClick={() => handleEdit(item)}>Edit</Button>
        <Button
          onClick={() => handleDelete(item)}
          style={{ color: "white", backgroundColor: "red" }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
