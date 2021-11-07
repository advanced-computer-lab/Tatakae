import React, { Component } from 'react'
import './App.css'
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

export default class SignIn extends Component {
    state = {
        username: '',
        password: '',
        showPassword: false,
    }

    handleChange = (event) => {
        this.setState(() => ({
            password: event.target.value
        }))
    };

    handleUsernameChange = (event) => {
        this.setState(() => ({
            username: event.target.value
        }))
    };

    handleClickShowPassword = () => {
        this.setState(() => ({
            showPassword: !this.state.showPassword
        }))
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        return (
            <div className='center'>
                <h1>Welcome to Jett Airlines</h1>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
                    <FilledInput
                        id="filled-adornment-username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} edge="end" />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <br />

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                    <FilledInput
                        id="filled-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br />
                <Button variant="contained" href='/home' disabled={this.state.password !== 'admin' || this.state.username !== 'admin'}>
                    Log In
                </Button>
            </div>
        )
    }
}
