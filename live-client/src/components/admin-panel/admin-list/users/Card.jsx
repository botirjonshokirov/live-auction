import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import axios from "axios";

const UserCard = ({ user }) => {
  const handleEdit = (user) => {
    console.log("Edited");
  };

  const handleDelete = (user) => {
    // Display confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    // If user clicked 'OK' in the dialog, make the DELETE request
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/user/${user._id}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("Item deleted");
            // Perform any necessary actions after successful deletion
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
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2">{user.phone}</Typography>
        <Typography variant="body2">{user.address}</Typography>
        <Button
          onClick={() => handleEdit(user)}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(user)}
          variant="outlined"
          color="secondary"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
