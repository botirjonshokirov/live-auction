import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Typography, Box, CircularProgress } from "@mui/material";

const AdminProfile = (props) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = props.user._id.toString(); // Replace with the actual user ID
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/${userId}`
        );
        setUserInfo(res.data);
      } catch (error) {
        console.log("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [props, props.loading]);

  if (!userInfo) {
    return <CircularProgress />;
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Username:</strong> {userInfo.username}
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          <strong>Email:</strong> {userInfo.email}
        </Typography>
      </Box>
      {/* Render additional user information fields here */}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: state.auth.user?.role === "admin",
  user: state.auth.user,
});

export default connect(mapStateToProps)(AdminProfile);
