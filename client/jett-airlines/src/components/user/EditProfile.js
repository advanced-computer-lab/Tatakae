import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const user = JSON.parse(sessionStorage.getItem('signedUser'));

export default class EditProfile extends Component {
    state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        homeAddress: user.homeAddress,
        passportNumber: user.passportNumber,
        password: '',
        openSuccess:false,
        openError: false
    }
   


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            homeAddress: this.state.homeAddress,
            passportNumber: this.state.passportNumber,
            token: sessionStorage.getItem('token')
        }
        if (this.state.password !== '') {
            data.password = this.state.password
        }
        //axios
        axios.patch('http://localhost:8082/api/users/userupdate/', data)
            .then(res => {
                this.setState({
                    password: '',
                    openSuccess: true ,
                    openError: false
                })
                sessionStorage.setItem('signedUser', JSON.stringify(res.data.userIn))
            })
            .catch(err => {
                this.setState({
                    openError: true 
                })
            })

    }
     handleCloseSuccess = () => {
        this.setState({
            openSuccess: false 
        })      }

    render() {
        return (
            <div className="center">
                <h1>Edit Profile</h1>
                <Dialog
                    open={this.state.openSuccess}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseSuccess}
                    aria-describedby="alert-dialog-slide-description"
                >

                    <Alert severity="success" 
                        action={
                            <Button onClick={this.handleCloseSuccess} color="inherit" size="small" variant="outlined">
                                Done
                            </Button>
                        }
                    >
                        Profile has been updated Successfully.
                    </Alert>

                </Dialog>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Name</InputLabel>
                    <FilledInput
                        name='firstName'
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Last Name</InputLabel>
                    <FilledInput
                        name='lastName'
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Passport Number</InputLabel>
                    <FilledInput
                        name='passportNumber'
                        value={this.state.passportNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Email</InputLabel>
                    <FilledInput
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Home Address</InputLabel>
                    <FilledInput
                        name='homeAddress'
                        value={this.state.homeAddress}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>New Password</InputLabel>
                    <FilledInput
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormControl>
        
                <br />
                <br />
                {this.state.openError && <Alert severity='error' >Email already exists. Try Again.</Alert>}
                <Button variant="contained" onClick={this.handleSubmit}>Update Profile</Button>
                <br />
                <br />
                <Button variant="contained" href='/home'>Back to Home</Button>
            </div>

        )
    }
}
