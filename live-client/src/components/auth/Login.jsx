import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { login, skipLogin } from "../../actions/auth";
import { setAlert, removeAlert } from "../../actions/alert";
import Spinner from "../../images/spinner/spinner";
import Alert from "../utils/Alert";
import "./Login.css";

const Login = (props) => {
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.login(email, password);
  };

  if (props.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="auth__container_login">
        <div className="auth">
          <div className="auth__image-container">
            <h1>Auction AEH</h1>
          </div>
          <Typography variant="h6" gutterBottom>
            Log in to your account
          </Typography>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <Alert />
            </div>

            <div className="form-group">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                type="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={onChange}
              />
            </div>
            <Button fullWidth variant="contained" type="submit" color="primary">
              Login
            </Button>
          </form>

          <p>
            Don't have an account? <br />
            <br />
            <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  login,
  skipLogin,
  setAlert,
  removeAlert,
})(Login);
