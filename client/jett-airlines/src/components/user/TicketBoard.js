import React, { useState, useEffect } from 'react'
import TicketCard from './TicketCard';
import Grid from '@mui/material/Grid';
import axios from 'axios'

export default function TicketBoard() {

    const [reservations, setReservations] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const data={
        token: sessionStorage.getItem('token')
      }

    useEffect(() => {

        axios.post('http://localhost:8082/api/reservations/getuserreservations/', data).then(res => {
            setReservations(res.data);
            console.log(res.data)
        })
    }, [refresh])


    return (
        <div>
            <br/>
            <br/>
            <div>
                {reservations.map(reservation => (
                    <Grid key={reservation.reservationNumber} item xs={4} >
                        <TicketCard reservation={reservation} refresh={refresh} setRefresh={setRefresh} />
                    </Grid>
                ))
                }
            </div>

        </div>
    )
}
