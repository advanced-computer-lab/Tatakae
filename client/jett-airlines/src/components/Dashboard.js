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

export default function Dashboard() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [numberQuery, setNumberQuery] = useState('');
  const [deptDateQuery, setDeptDateQuery] = useState(null);
  const [arrDateQuery, setArrDateQuery] = useState('');
  const [terminalQuery, setTerminalQuery] = useState('');

  const [open, setOpen] = React.useState(false);

  const handleChangeNumber = (event) => {
    setNumberQuery(Number(event.target.value) || '');
    console.log(numberQuery)
    filtering();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const filtering = () => {
    if (numberQuery) {
      setFilteredFlights(flights.filter(flight => Number(flight.flightNumber) === Number(numberQuery) ))
    }
    else {
      setFilteredFlights(flights)
    }
  }

  useEffect(() => {

    axios.get('http://localhost:8082/api/flights/flightgetall').then(res => {
      setFlights(res.data)
    })
  }, [refresh])

  return (
    <div className='center'>
      <h1>Welcome Admin</h1>
      <Button onClick={handleClickOpen}>Search Options</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Flight Number</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={numberQuery}
                onChange={handleChangeNumber}
                input={<OutlinedInput label="Flight Number" />}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {flights.map(flight => (
                  <MenuItem key={flight.flightNumber} value={flight.flightNumber}>{flight.flightNumber}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
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
