import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ user }) => {
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
      </CardContent>
    </Card>
  );
};

export default UserCard;
