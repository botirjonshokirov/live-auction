import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// MUI
import {
  Box,
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Grid,
} from "@mui/material";
// Style files
import { boxStyle, paperStyle } from "../css/adStyles";
import { profileTableStyle, tableCellStyle } from "../css/dashStyle";
// Actions
import { clearAlerts } from "../../actions/alert";
// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
// Project files
import Spinner from "../utils/Spinner";
import DashboardAdList from "./DashboardAdList";
import LoadingDisplay from "../utils/LoadingDisplay";
// Actions
import { getUserPurchasedAds } from "../../actions/ad";
import DashPurchasedList from "./DashPurchasedList";

import "./Dashboard.css";

const Dashboard = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.isAuth) {
      props.getUserPurchasedAds();
    }
  }, [props, props.loading]);

  useEffect(() => {
    return () => {
      props.clearAlerts();
    };
  }, [props]);

  // Check if user is logged
  if (!props.isAuth) {
    navigate("/login");
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <div className="avatar-container">
                <Avatar
                  className="avatar"
                  style={{ width: "100px", height: "100px" }}
                >
                  {props.user.username.charAt(0).toUpperCase()}
                </Avatar>
                <button className="add-photo-button">Add Photo</button>
              </div>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h5" component="div">
                <AccountCircleIcon fontSize="inherit" /> My Profile
              </Typography>
            </Grid>
          </Grid>
          <Box sx={profileTableStyle}>
            <Table
              sx={{ width: "60%", minWidth: "200px" }}
              aria-label="simple table"
            >
              <TableBody>
                <TableRow key="Username">
                  <TableCell align="right" sx={tableCellStyle}>
                    User name
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {props.user.username}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={tableCellStyle}>
                    Email
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {props.user.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={tableCellStyle}>
                    Phone
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {props.user.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={tableCellStyle}>
                    Address
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {props.user.address}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={tableCellStyle}>
                    Balance
                  </TableCell>
                  <TableCell align="left" sx={tableCellStyle}>
                    {props.user.balance}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>

      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Typography variant="h5" component="div">
            <StorefrontIcon fontSize="inherit" /> My ads
          </Typography>
          <DashboardAdList />
        </Paper>
      </Box>

      <Box sx={boxStyle}>
        <Paper sx={paperStyle}>
          <Typography variant="h5" component="div">
            <ShoppingCartIcon fontSize="inherit" /> My purchases
          </Typography>
          {props.purchasedLoading ? (
            <LoadingDisplay />
          ) : (
            <DashPurchasedList ads={props.purchased} />
          )}
        </Paper>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { getUserPurchasedAds, clearAlerts })(
  Dashboard
);
