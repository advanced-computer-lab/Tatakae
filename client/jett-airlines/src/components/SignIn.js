import React, { Component } from 'react'
import '../css/SignIn.css'

//mui imports
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//file imports
import bg from '../assets/travelwallpaper22.jpg'
import logo from '../assets/Logo.png'


const theme = createTheme({
    palette: {
        mode: 'light'
    },
});

const styles = {
    background: {
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`
    },
    paperStyle: {
        padding: 20,
        conetentFit: 'contain',
        height: '410px',
        width: '400px',
        margin: "120px auto"
    },
    avatarStyle: {
        backgroundColor: '#2f8edf'
    },
    btnstyle: {
        height: '40px',
        margin: '30px 0'
    },
    fieldStyle: {
        margin: '30px 0 0 0'
    },
    logoStyle: {
        height: '50px',
        margin: '20px'
    },
    textStyle: {
        margin: '5px 0 0 0'
    }

};

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
            <div style={styles.background}>
                <ThemeProvider theme={theme}>
                    <Grid>
                        <img src={logo} alt='' style={styles.logoStyle} />
                        <Paper elevation={10} style={styles.paperStyle}>
                            <Grid align='center'>
                                <Avatar style={styles.avatarStyle}><LockOutlinedIcon /></Avatar>

                                <Typography style={styles.textStyle}>
                                    <h2>Sign In</h2>
                                </Typography>

                            </Grid>
                            <TextField
                                style={styles.fieldStyle}
                                label='Username'
                                placeholder='Enter username'
                                fullWidth
                                required
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 1 }} edge="end" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                id="passField"
                                style={styles.fieldStyle}
                                label='Password'
                                placeholder='Enter password'
                                type={this.state.showPassword ? 'text' : 'password'}
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
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                style={styles.btnstyle}
                                fullWidth
                                href='/home'
                                disabled={this.state.password !== 'admin' || this.state.username !== 'admin'}>
                                Sign in
                            </Button>
                        </Paper>
                    </Grid>
                </ThemeProvider>
            </div>
        )
    }
}

/*

<div className="text-fields">
                <FormControl sx={{ m: 1 }}variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-username"
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

                <FormControl sx={{ m: 1  }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput

                    className="h"
                        id="outlined-adornment-password"
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
                </div>
                <Button variant="contained" href='/home' disabled={this.state.password==='' || this.state.username===''}>
                    Log In
                </Button>


*/


/*

<ThemeProvider theme={theme}>
                    <TextField variant="standard">

                    </TextField>
                </ThemeProvider>


                <FormControl sx={{ m: 3 }} className="password" >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        dark
                        id="outlined-adornment-password"
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
*/