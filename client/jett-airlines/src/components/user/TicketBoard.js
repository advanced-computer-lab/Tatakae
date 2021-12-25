import React, { useState, useEffect } from 'react'
import Reservation from './Reservation';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Typography,Toolbar,AppBar } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const styles = {
    paperStyle1: {
        padding: 20,
        conetentFit: 'contain',
        minHeight: '100vh',
        maxHeight: 'auto',
        width: '90vw',
        margin: "-23vh 0 0 3.75vw"
    },

    paperStyle2: {
        padding: 20,
        conetentFit: 'contain',
        minHeight: '100vh',
        maxHeight: 'auto',
        width: '90vw',
        margin: "-9vh 0 0 3.75vw"
    }
    ,
    btnstyle: {
        height: '40px',
        width: '220px',
        margin: '-130px 0px 0px 20px',
        alignitems: 'center'
      },
};

export default function TicketBoard() {

    const [reservations, setReservations] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [noReservations, setNoReservations] = useState(false);

    const data = {
        token: sessionStorage.getItem('token')
    }

    useEffect(() => {

        axios.post('http://localhost:8082/api/reservations/getuserreservations/', data).then(res => {
            if(res.data.length !== 0){
                setReservations(res.data);
                setNoReservations(false)
            }
            else{
                setNoReservations(true)
            }
        })
    }, [refresh])


    return (
        <div>
            <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
        <MenuBookIcon sx={{ fontSize: 40 }} backgroundColor="black"/> 
          <Typography  style={{ margin: "0 0 0 5px" }} variant="h4" color="inherit" noWrap>
            Reservations
          </Typography>
          <Button
            color='primary'
            variant="contained"
            sx={{margin:"0 0 0 1100px"}}
            startIcon={<HomeIcon />}
            href='/home'>Home</Button>
        </Toolbar>

      </AppBar>
      <br/>
      <br/>
      <br/>


          
                {noReservations? (<Typography sx={{
     
      fontSize: '3em',
      fontWeight: 'bold',textAlign:"center"}}>No reservations yet</Typography>) 
                :
                (                <Grid container spacing={5} style={{ margin: ' 0vh 0vw' }}>
                {reservations.map(reservation => (
                    <Grid key={reservation.reservationNumber} item xs={4} >
                        <Reservation reservation={reservation} refresh={refresh} setRefresh={setRefresh} />
                    </Grid>
                ))
                }
            </Grid>)}

        
        </div>
    )
}
