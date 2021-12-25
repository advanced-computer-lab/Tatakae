import axios from 'axios';
import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import bg from "../assets/travelwallpaper22.jpg";
import logo from "../assets/Logo.png";
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme();

const styles = {
    background: {
      position: "absolute",
      height: "120vh",
      width: "100vw",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment:"fixed",
    },
    logoStyle: {
        height: "50px",
        margin: "20px",
      },
    paperStyle: {
      padding: 20,
      conetentFit: "contain",
      width: "550px",
      margin: "0 auto",
      height:"750px"
      
    }}

export default class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        homeAddress: '',
        countryCode: '',
        telephoneNumber: '',
        passportNumber: '',
        openSuccess: false,
        openError: false,
        errorMessage:'',
        showPassword: false,
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        const emptyCheck= this.state.firstName==='' || this.state.lastName==='' || this.state.email==='' || 
        this.state.password==='' || this.state.homeAddress==='' || this.state.countryCode==='' || 
        this.state.telephoneNumber==='' || this.state.passportNumber==='';

        if (emptyCheck===true) {
            this.setState({
                openError: true,
                errorMessage: "Please fill all fields."
            })
        }
        else {
            const data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                homeAddress: this.state.homeAddress,
                countryCode: this.state.countryCode,
                telephoneNumber: this.state.telephoneNumber,
                passportNumber: this.state.passportNumber,
                administrator: false,
            }

            axios.post("http://localhost:8082/api/users/signUp/", data)
                .then(res => {
                    this.setState({
                        openSuccess: true,
                        openError:false
                    })
                })
                .catch((err)=>{
                    this.setState(() => ({
                        errorMessage: err.response.data.message,
                        openError:true
                    }));
                })
        }

    }

    handleClickShowPassword = () => {
        this.setState(() => ({
            showPassword: !this.state.showPassword,
        }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <div style={styles.background}>
                <Grid>
                <img src={logo} alt="" style={styles.logoStyle} />
                <Paper elevation={10} style={styles.paperStyle}>
        
            <Dialog
            open={this.state.openSuccess}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >

            <Alert severity="success"
                action={
                    <Button href='/logIn' color="inherit" size="small" variant="outlined">
                        Check it out
                    </Button>
                }
            >
                Account created successfully.
            </Alert>
        </Dialog>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullwidth>
                    <InputLabel >First Name *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullwidth>
                    <InputLabel >Last Name *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{width:"460px"}}>
                    <InputLabel >Email Address *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                    fullWidth
                    name='password'
                    label="Password *"
                    type={this.state.showPassword ? "text" : "password"}
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullwidth>
                    <InputLabel>Home Address *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='homeAddress'
                        value={this.state.homeAddress}
                        onChange={this.handleChange}
                    />
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullwidth>
                    <InputLabel>Country Code *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='countryCode'
                        value={this.state.countryCode}
                        onChange={this.handleChange}
                    />
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullwidth  sx={{width:"460px"}}>
                    <InputLabel>Telephone Number *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='telephoneNumber'
                        value={this.state.telephoneNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullwidth  sx={{width:"460px"}}>
                    <InputLabel>Passport Number *</InputLabel>
                    <OutlinedInput sx={{ height: 56 }}
                        name='passportNumber'
                        value={this.state.passportNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>
                </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                {this.state.openError && (
                <Alert severity="error">
                  {this.state.errorMessage}
                </Alert>
              )}
                  <Button
                   onClick={this.handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href='/logIn' variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            
            </Container>
            <br/>
            <br/>
            
          </ThemeProvider>
          </Paper>
          </Grid>
          </div>
        )
    }
}
