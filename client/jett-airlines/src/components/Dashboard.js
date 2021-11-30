import React, { useState, useEffect } from 'react'
import './App.css'
import AdminFlightCard from './admin/FlightCard'
import UserFlightCard from './user/FlightCard'
import Grid from '@mui/material/Grid';
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Paper, Typography, createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from "@mui/styles"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import bg from '../assets/travelwallpaper-1.png'
import logo from '../assets/Logo.png'
import darktab from '../assets/darkglass.png'
import DateTimePicker from '@mui/lab/DateTimePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Navigate } from 'react-router-dom'

const darktheme = createTheme({
  palette: {
    mode: 'dark'
  },
});
const useStyles = makeStyles({
  typographyStyle: {
    color: "white",
    font: "Roboto",
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [numberQuery, setNumberQuery] = useState('');
  const [deptDateQuery, setDeptDateQuery] = useState(null);
  const [arrDateQuery, setArrDateQuery] = useState(null);
  const [terminalQuery, setTerminalQuery] = useState('');
  const [passengerQuery, setPassengerQuery] = useState('');
  const [cabinQuery, setCabinQuery] = useState('');
  const [availabe, setAvailable] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [logOut, setLogOut] = React.useState(false);

  const user = JSON.parse(sessionStorage.getItem('signedUser'));

  const handleLogOut = () => {
    setLogOut(true);
  }

  const handleChangeCabin = (event) => {
    setCabinQuery(event.target.value);
  }

  const handleChangePassenger = (event) => {
    setPassengerQuery((event.target.value) || '');
  };

  const handleChangeNumber = (event) => {
    setNumberQuery((event.target.value).toUpperCase() || '');
  };

  const handleChangeTerminal = (event) => {
    setTerminalQuery(event.target.value || '');
  }

  const handleChangeAvailable = (event) => {
    setAvailable(!availabe)
  }

  const handleChangeDeptDate = (event) => {
    setDeptDateQuery(new Date(event))
  }

  const handleChangeArrDate = (event) => {
    setArrDateQuery(new Date(event))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const styles = {
    background: {
      position: 'absolute',
      padding: 'auto',
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${bg})`
    },

    btnstyle: {
      height: '40px',
      width: '220px',
      margin: '-130px 0px 0px 20px',
      alignitems: 'center'
    },

    logoStyle: {
      height: '50px',
      margin: '50px',
      alignitems: 'left'

    },
    dg: {
      height: '150px',
      width: '100vw',
      margin: '-2.5vh -1.25vw',

      backgroundImage: `url(${darktab})`
    },
    media: {
      height: '150px',
      width: '100vw',
      margin: '0px auto',
    },
    paperStyle: {
      padding: 20,
      conetentFit: 'contain',
      minHeight: '100vh',
      maxHeight: 'auto',
      width: '90vw',
      margin: "0% 0% 0% 2.5%"
    },
    textStyle: {
      margin: '5px 0 0 0',
      Color: 'white'
    },
    checkboxContainer: {
      textAlign: 'right',
      height: '200px',
      margin: "0% 5% 0% 2.5%",
    },
    checkboxStyle: {
      margin: "12% 2% 0% 0%",
      color: 'white'
    },
  };

  const handleChoice = () => {
    filtering()
    handleClose()
  }

  const filtering = () => {
    let x = flights
    if (!user.admin) {
      x = x.filter(flight => new Date(flight.departureDate) >= new Date())
    }
    if (numberQuery) {
      x = x.filter(flight => flight.flightNumber === numberQuery)
    }
    if (terminalQuery) {
      x = x.filter(flight => flight.airportTerminal === terminalQuery)
    }
    if (cabinQuery) {
      switch (cabinQuery) {
        case 'Economy': x = x.filter(flight => flight.availableEconomySeats > 0); break;
        case 'Business': x = x.filter(flight => Number(flight.availableBusinessSeats) > 0); break;
        case 'First': x = x.filter(flight => flight.availableFirstSeats > 0); break;
        default: break;
      }
    }
    if (passengerQuery) {
      x = x.filter(flight => flight.availableTotalSeats >= passengerQuery)
    }
    if (deptDateQuery) {
      x = x.filter(flight => new Date(flight.departureDate).setSeconds(0, 0) === new Date(deptDateQuery).setSeconds(0, 0))
    }
    if (arrDateQuery) {
      x = x.filter(flight => new Date(flight.arrivalDate).setSeconds(0, 0) === new Date(arrDateQuery).setSeconds(0, 0))
    }
    if (availabe) {
      x = x.filter(flight => new Date(flight.departureDate) >= new Date())
    }
    setFilteredFlights(x)
  }

  useEffect(() => {
    axios.get('http://localhost:8082/api/flights/flightgetall').then(res => {
      setFlights(res.data)
    })
  }, [refresh])

  useEffect(() => {
    filtering()
  }, [flights, availabe])

  const flightNumberSearch = (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-dialog-select-label">Flight Number</InputLabel>
      <InputLabel>Flight Number</InputLabel>
      <OutlinedInput
        name='flightNumber'
        id="flightNumberfield"
        value={numberQuery}
        type="text"
        onChange={handleChangeNumber}
      />
    </FormControl>)

  const passengerSeatsSearch = (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-dialog-select-label">Passenger Seats</InputLabel>
      <InputLabel>Passenger Seats</InputLabel>
      <OutlinedInput
        name='flightNumber'
        id="flightNumberfield"
        value={passengerQuery}
        type="text"
        onChange={handleChangePassenger}
      />
    </FormControl>)

  const cabinClassSearch = (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-dialog-select-label">Cabin Class</InputLabel>
      <Select
        labelId="demo-dialog-select-label"
        id="demo-dialog-select"
        value={cabinQuery}
        defaultValue=''
        onChange={handleChangeCabin}
        input={<OutlinedInput label="Cabin Class" />}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value='Economy'>Economy</MenuItem>
        <MenuItem value='Business'>Business</MenuItem>
        <MenuItem value='First'>First</MenuItem>
      </Select>
    </FormControl>)

    const availableFlightsCheckbox=(
      <div style={styles.checkboxContainer} >
        <ThemeProvider theme={darktheme}>
          <FormControlLabel style={styles.checkboxStyle} control={<Checkbox checked={availabe}
            onChange={handleChangeAvailable}
            inputProps={{ 'aria-label': 'controlled' }} />} label="Show Available Flights" />
        </ThemeProvider>
      </div>
    )

  return (
    <div style={styles.background}>
      <div style={styles.dg} >
        <img src={logo} alt='' style={styles.logoStyle} />
        <Grid container spacing={5} style={{ margin: '4.75vh 18vw' }}>
          <Button
            color='primary'
            variant="contained"
            style={styles.btnstyle}
            startIcon={<HomeIcon />}
            href='/home'>Home</Button>
            
          <Button
            color='primary'
            variant="contained"
            style={styles.btnstyle}
            startIcon={<SearchIcon />}
            onClick={handleClickOpen}>Search For Flights</Button>

          {user.admin? (<Button
            color='primary'
            variant="contained"
            style={styles.btnstyle}
            startIcon={<FlightIcon />}
            href='/CreateFlight'>Create Flight</Button>)
          :
          (<Button
            color='primary'
            variant="contained"
            style={styles.btnstyle}
            startIcon={<EditIcon />}
            href='/EditProfile'>Edit Profile</Button>)}

          <Button
            color='primary'
            variant="contained"
            style={styles.btnstyle}
            startIcon={<LogoutIcon />}
            onClick={handleLogOut}>Log Out</Button>
        </Grid>

      </div>

      <Typography margin={'0vh 4vw'} className={classes.typographyStyle}>
        Welcome {user.firstName} {user.lastName}
      </Typography>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} >
        <DialogTitle>Search the following criteria</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>

            {user.admin ? flightNumberSearch : passengerSeatsSearch}

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Terminal</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={terminalQuery}
                defaultValue=''
                onChange={handleChangeTerminal}
                input={<OutlinedInput label="Terminal No." />}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {flights.map(item => item.airportTerminal)
                  .filter((value, index, self) => self.indexOf(value) === index).map(terminal => (
                    <MenuItem key={terminal} value={terminal}>{terminal}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            {!user.admin && cabinClassSearch}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Departure Date"
                value={deptDateQuery}
                onChange={handleChangeDeptDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Arrival Date"
                value={arrDateQuery}
                onChange={handleChangeArrDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChoice}>Search</Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />

      {user.admin && availableFlightsCheckbox}

      <Paper elevation={20} style={styles.paperStyle}>
        <Grid container spacing={5} style={{ margin: ' 0vh 0vw' }}>
          {user.admin? filteredFlights.map(flight => (
            <Grid key={flight._id} item xs={4} >
              <AdminFlightCard flight={flight} refresh={refresh} setRefresh={setRefresh} />
            </Grid>
          ))
          :
           filteredFlights.map(flight => (
            <Grid key={flight._id} item xs={4} >
              <UserFlightCard flight={flight} refresh={refresh} setRefresh={setRefresh} />
            </Grid>
          ))}
          
        </Grid>
      </Paper>
      {logOut && (<Navigate to='/logIn' />)}
    </div>
  )
}
