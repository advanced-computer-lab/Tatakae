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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            <div>
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
                <h1>Create a new Account!</h1>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>First Name</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Last Name</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Email</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Country Code</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='countryCode'
                        value={this.state.countryCode}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Home Address</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='homeAddress'
                        value={this.state.homeAddress}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Telephone Number</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='telephoneNumber'
                        value={this.state.telephoneNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Passport Number</InputLabel>
                    <OutlinedInput sx={{ height: 40 }}
                        name='passportNumber'
                        value={this.state.passportNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <TextField
                    name='password'
                    label="Password"
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

                <br />
                {this.state.openError && (
                <Alert severity="error">
                  {this.state.errorMessage}
                </Alert>
              )}
             
                <Button variant="contained" onClick={this.handleSubmit} sx={{ mt: 3, ml: 1 }}>Create Account</Button>
                <Button variant="contained" href='/logIn' sx={{ mt: 3, ml: 1 }}>Back to Login</Button>
            </div>
        )
    }
}
