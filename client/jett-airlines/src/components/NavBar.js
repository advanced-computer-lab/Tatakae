import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import IconButton from '@mui/material/IconButton';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import Box from '@mui/material/Box';

import logo from '../assets/Logo.png';

export default function NavBar() {


  const styles = {
    background: {
      //backgroundColor: '#2f8edf',
      width: '100vw',
      minHeight: '100vh',
    },
    appBarStyle: {
      //backgroundColor: '#fff',
      //height: '200px'
    },
    buttonStyle: {
      //color: 'black'
    },
    logoStyle: {
      height: '30px'
    },
  };

  return (

    <AppBar position="sticky" elevation={20} style={styles.appBarStyle}>
      <Toolbar sx={{gap: 2}}>
        <img src={logo} alt='' style={styles.logoStyle} />
        <Button
          //startIcon={<HomeRoundedIcon />}
          sx={{borderRadius: 50}}
          variant='outlined'
          color='inherit'
          style={styles.buttonStyle}
          href='/home'
        >
          Home
        </Button>
        <Button
          //startIcon={<FlightRoundedIcon/>}
          sx={{borderRadius: 50}}
          variant='outlined'
          color='inherit'
          style={styles.buttonStyle}
          href='/Create-Flight'
        >
          Ceate Flight
        </Button>
        <Box sx={{flexGrow: 1}} />
        <Button
          color='inherit'
          href='/'
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>

  )
}
