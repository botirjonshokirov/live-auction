import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ItemCard = ({ item }) => {
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    basePrice: item.basePrice.$numberDecimal,
    productName: item.productName,
    description: item.description,
  });
  const handleEdit = () => {
    setEditing(true);
  };
  const handleSave = () => {
    // Make PUT request to update the ad with the given id
    fetch(`${process.env.REACT_APP_API_BASE_URL}/ad/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        basePrice: editedValues.basePrice,
        productName: editedValues.productName,
        description: editedValues.description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setEditing(false);
          console.log("Item updated");
        } else {
          throw new Error("Item update failed");
        }
      })
      .catch((err) => {
        // Handle network errors or other exceptions
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
      })
        .then((res) => {
          if (res.ok) {
            console.log("Item deleted");
          } else {
            throw new Error("Item deletion failed");
          }
        })
        .catch((err) => {
          // Handle network errors or other exceptions
          console.log(err);
        });
    }
  };

  return (
    <Card sx={{ width: 300, margin: 10 }}>
      <CardContent>
        {editing ? (
          <>
            <input
              type="number"
              value={editedValues.basePrice}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                  basePrice: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedValues.productName}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                  productName: e.target.value,
                })
              }
            />
            <textarea
              value={editedValues.description}
              onChange={(e) =>
                setEditedValues({
                  ...editedValues,
                  description: e.target.value,
                })
              }
            />
            <Button onClick={handleSave}>Save</Button>
          </>
        ) : (
          <>
            <Typography variant="subtitle2">
              Base Price: {item.basePrice.$numberDecimal}
            </Typography>
            <Typography variant="h6">{item.productName}</Typography>
            <Typography variant="subtitle1">{item.description}</Typography>
            <Button onClick={handleEdit}>Edit</Button>
          </>
        )}

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
