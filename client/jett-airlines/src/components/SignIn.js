import React, { Component } from "react";
import "../css/SignIn.css";
import { Navigate } from "react-router-dom";

import {
  TextField,
  Avatar,
  Paper,
  Grid,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

import bg from "../assets/travelwallpaper22.jpg";
import logo from "../assets/Logo.png";
import axios from "axios";

const darktheme = createTheme({
  palette: {
    mode: "light",
  },
});
const styles = {
  background: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${bg})`,
  },
  paperStyle: {
    padding: 20,
    conetentFit: "contain",

    width: "400px",
    margin: "120px auto",
  },
  avatarStyle: {
    backgroundColor: "#2f8edf",
  },
  btnstyle: {
    height: "40px",
    margin: "30px 0",
  },
  fieldStyle: {
    margin: "30px 0 0 0",
  },
  logoStyle: {
    height: "50px",
    margin: "20px",
  },
  textStyle: {
    margin: "5px 0 0 0",
  },
};
export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    home: false,
    errorPop: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:8082/api/users/login/", data)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("signedUser", JSON.stringify(res.data.userIn));
        this.setState(() => ({
          home: true,
        }));
      })
      .catch((err) =>
        this.setState(() => ({
          errorPop: true,
        }))

      );
  };

  handleChange = (event) => {
    this.setState(() => ({
      password: event.target.value,
    }));
  };

  handleUsernameChange = (event) => {
    this.setState(() => ({
      email: event.target.value,
    }));
  };

  handleClickShowPassword = () => {
    this.setState(() => ({
      showPassword: !this.state.showPassword,
    }));
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  componentDidMount() {
    sessionStorage.clear();
  }

  render() {
    return (
      <div style={styles.background}>
        <ThemeProvider theme={darktheme}>
          <Grid>
            <img src={logo} alt="" style={styles.logoStyle} />
            <Paper elevation={10} style={styles.paperStyle}>
              <Grid align="center">
                <Avatar style={styles.avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>

                <Typography style={styles.textStyle}>Sign In</Typography>
              </Grid>
              <TextField
                style={styles.fieldStyle}
                label="Email"
                placeholder="Enter Email"
                fullWidth
                required
                value={this.state.email}
                onChange={this.handleUsernameChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle
                        sx={{ color: "action.active", mr: 1, my: 1 }}
                        edge="end"
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="passField"
                style={styles.fieldStyle}
                label="Password"
                placeholder="Enter password"
                type={this.state.showPassword ? "text" : "password"}
                fullWidth
                required
                value={this.state.password}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {this.state.errorPop && (
                <Alert style={{ marginTop: 30 }} severity="error">
                  Email/Password are incorrect. Please try again.
                </Alert>
              )}

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={styles.btnstyle}
                fullWidth
                onClick={this.handleSubmit}
              >
                Sign in
              </Button>
              <Link href="/" underline="none">
                Continue as Guest
              </Link>
              {this.state.home && <Navigate to="/home" />}
            </Paper>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}
