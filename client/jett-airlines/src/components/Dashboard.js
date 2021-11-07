import React, { useState, useEffect } from 'react'
import './App.css'
import FlightCard from './FlightCard'
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

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
    <div className='center'>
      <h1>Welcome Admin</h1>
      <Button onClick={handleClickOpen}>Search Options</Button>
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
      <Grid container spacing={2}>
        {filteredFlights.map(flight => (
          <Grid key={flight._id} item xs={4} >
            <FlightCard flight={flight} refresh={refresh} setRefresh={setRefresh} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
