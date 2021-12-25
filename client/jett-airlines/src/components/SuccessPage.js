import React from 'react'
import {
    Button,
} from "@mui/material";
import axios from 'axios';

export default function SuccessPage() {

    React.useEffect(async () => {
        let reservationNumber = '';
        if (JSON.parse(sessionStorage.getItem('deptData'))) {
            await axios.post('http://localhost:8082/api/reservations/reservationcreate/', JSON.parse(sessionStorage.getItem('deptData')))
                .then(res => reservationNumber = res.data)
                .catch(err => console.log(err))
            await axios.patch('http://localhost:8082/api/flights/flightbookseats/', JSON.parse(sessionStorage.getItem('deptDataBooks')))
                .catch(err => console.log(err))

            sessionStorage.removeItem('deptData')
            sessionStorage.removeItem('deptDataBooks')
        }

        if (JSON.parse(sessionStorage.getItem('returnData'))) {
            let returnData = JSON.parse(sessionStorage.getItem('returnData'));
            let returnDataBooks = JSON.parse(sessionStorage.getItem('returnDataBooks'));

            returnData.reservationNumber = reservationNumber;

            await axios.patch('http://localhost:8082/api/reservations/bookhalfreservation/', returnData)
                .catch(err => console.log(err))
            await axios.patch('http://localhost:8082/api/flights/flightbookseats/', returnDataBooks)
                .catch(err => console.log(err))

            sessionStorage.removeItem('returnData')
            sessionStorage.removeItem('returnDataBooks')
        }

        const authChannel = new BroadcastChannel("auth")
        authChannel.postMessage({ success: true })
        //window.setTimeout(()=>{window.close()}, 5000);
    }, [])

    return (
        <div>
            <h1 className='center'>Success</h1>
        </div>
    )
}
