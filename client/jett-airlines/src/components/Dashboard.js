import React, { useState, useEffect } from 'react'
import './App.css'
import FlightCard from './FlightCard'
import Grid from '@mui/material/Grid';
import axios from 'axios'

export default function Dashboard() {
  const [flights,setFlights] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8082  ').then(res=>console.log(res.data))
  
  }, [flights])

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
        <Grid item xs={4} >
        <FlightCard />
        </Grid>
        <Grid item xs={4}>
        <FlightCard />
        </Grid>
        <Grid item xs={4} >
        <FlightCard />
        </Grid>
        <Grid item xs={4} >
        <FlightCard />
        </Grid>
      </Grid>
    </div>
  )
}
