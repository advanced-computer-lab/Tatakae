import React, { useState, useEffect } from 'react'
import './App.css'
import FlightCard from './FlightCard'
import Grid from '@mui/material/Grid';
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import bg from '../assets/travelwallpaper-1.png'
import logo from '../assets/Logo.png'
import darktab from '../assets/darkglass.png'

export default function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [numberQuery, setNumberQuery] = useState('');
  const [deptDateQuery, setDeptDateQuery] = useState('');
  const [arrDateQuery, setArrDateQuery] = useState('');
  const [terminalQuery, setTerminalQuery] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleChangeNumber = (event) => {
    setNumberQuery(Number(event.target.value) || '');
  };

  const handleChangeTerminal = (event) => {
    setTerminalQuery(event.target.value || '');
  }

  const handleChangeDeptDate= (event)=>{
    console.log(event.toLocaleDateString())
    setDeptDateQuery(event.toLocaleDateString())
  }

  const handleChangeArrDate= (event)=>{
    setArrDateQuery(new Date(event.toLocaleDateString()).toLocaleDateString())
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
      padding: '20',
      height: '100vh',
      width: '100vw',
      backgroundImage: `url(${bg})`
    }, 

    btnstyle: {
      height: '40px',
      margin: '-130px 0px 0px 100px',
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
      margin: '0',
      
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
      height: '100vh',
      width: '90vw',
      margin: "12% 0% 0% 3%"
  }
  };

  const handleChoice = () => {
    filtering()
    handleClose()
  }

  const filtering = () => {
    let x=flights
    if (numberQuery) {
      x=x.filter(flight => Number(flight.flightNumber) === Number(numberQuery))
    }
    if (terminalQuery) {
      x=x.filter(flight => flight.airportTerminal === terminalQuery)
    }
    if(deptDateQuery){
      x=x.filter(flight=> flight.departureDate.substring(0,10) === deptDateQuery)
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
  }, [flights])

  return (
    <div style={styles.background}>
      <div  style={styles.dg} >
        
      <img src={logo} alt='' style={styles.logoStyle} />
      <Button 
      color='primary'
      variant="contained"
      style={styles.btnstyle}
      startIcon={<SearchIcon />}
      onClick={handleClickOpen}>Search For Flights</Button>
      
      </div>
     
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Search the following criteria</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Flight Number</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={numberQuery}
                defaultValue='None'
                onChange={handleChangeNumber}
                input={<OutlinedInput label="Flight Number" />}
              >
                <MenuItem value='None'>
                  <em>None</em>
                </MenuItem>
                {flights.map(flight => (
                  <MenuItem key={flight.flightNumber} value={flight.flightNumber}>{flight.flightNumber}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Terminal</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={terminalQuery}
                defaultValue=''
                onChange={handleChangeTerminal}
                input={<OutlinedInput label="Flight Number" />}
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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Departure Date"
                        value={deptDateQuery}
                        onChange={handleChangeDeptDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
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
      <Paper elevation={20} style={styles.paperStyle}><Grid container spacing={5} style = {{margin: ' 0vh 4vw'}}>
        {filteredFlights.map(flight => (
          <Grid key={flight._id} item xs={4} >
            <FlightCard flight={flight} refresh={refresh} setRefresh={setRefresh} />
          </Grid>
        ))}
      </Grid></Paper>
    </div>
  )
}
