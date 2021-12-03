import React from 'react'
import TicketCard from './TicketCard';

export default function TicketBoard() {

    const [reservations, setReservations] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/api/users/getUserReservation').then(res => {
            setReservations(res.data)
        })
    }, [refresh])
    return (
        <div>
            <br/>
            <br/>
            <div>
                {reservations.map(reservation => (
                    <Grid key={reservation._id} item xs={4} >
                        <TicketCard reservation={reservation} refresh={refresh} setRefresh={setRefresh} />
                    </Grid>
                ))
                }
            </div>

        </div>
    )
}
