import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import axios from 'axios';

const user = JSON.parse(sessionStorage.getItem('signedUser'));

export default class EditProfile extends Component {
    state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        homeAddress: user.homeAddress,
        passportNumber: user.passportNumber,
        password: ''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const data ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            homeAddress: this.state.homeAddress,
            passportNumber: this.state.passportNumber,
            password: this.state.password,
            token: sessionStorage.getItem('token')
        }
        //axios
    }

    render() {
        return (
            <div className="center">
                <h1>Edit Profile</h1>
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
                <Button variant="contained" onClick={this.handleSubmit}>Update Profile</Button>
                <br/>
                <br/>
                <Button variant="contained" href='/home'>Back to Home</Button>
            </div>
        )
    }
}
