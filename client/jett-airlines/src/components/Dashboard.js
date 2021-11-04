import React, { useState, useEffect } from 'react'
import './App.css'
import FlightCard from './FlightCard'
import Grid from '@mui/material/Grid';
import axios from 'axios'

export default function Dashboard() {
  const [flights,setFlights] = useState([]);
  const [refresh, setRefresh]= useState(false);
  useEffect(() => {

    axios.get('http://localhost:8082/api/flights/flightgetall').then(res=>{setFlights(res.data)
  console.log(res.data)})
  }, [refresh])

  return (
    <div className='center'>
      <h1>Welcome Admin</h1>
      <input
        className='search-contacts'
        type='text'
        placeholder='Name'
      />
      <input
        className='search-contacts'
        type='text'
        placeholder='From'
      />
      <input
        className='search-contacts'
        type='text'
        placeholder='To'
      />
      <br />
      <br />
      <Grid container spacing={2}>
        {flights.map(flight=>(
          <Grid key={flight._id} item xs={4} >
          <FlightCard flight={flight} refresh={refresh} setRefresh={setRefresh}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
