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

        const prevTicket = JSON.parse(sessionStorage.getItem('Ticket'));
        const newTicket = JSON.parse(sessionStorage.getItem('newTicket'));

        if (prevTicket) {
            if (prevTicket.departureTicket) {
                const token_allold_seatlists_flightid = {
                    token: sessionStorage.getItem('token'),
                    flightId: prevTicket.departureTicket.flight,
                    firstSeatsAdults: prevTicket.departureTicket.firstSeatsAdults,
                    businessSeatsAdults: prevTicket.departureTicket.businessSeatsAdults,
                    economySeatsAdults: prevTicket.departureTicket.economySeatsAdults,
                    firstSeatsChildren: prevTicket.departureTicket.firstSeatsChildren,
                    businessSeatsChildren: prevTicket.departureTicket.businessSeatsChildren,
                    economySeatsChildren: prevTicket.departureTicket.economySeatsChildren
                }
                await axios.patch('http://localhost:8082/api/flights/flightcancelseats/', token_allold_seatlists_flightid)
                const token_oldTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    departureTicket: prevTicket.departureTicket,
                    reservationNumber: prevTicket.resNo
                }
               // await axios.patch('http://localhost:8082/api/reservations/cancelhalfreservation/', token_oldTicket_reservNo)
                   // .catch(err => console.log(err))

                const token_newTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    departureTicket: newTicket,
                    reservationNumber: prevTicket.resNo
                }
                await axios.patch('http://localhost:8082/api/reservations/bookhalfreservation/', token_newTicket_reservNo)
                    .catch(err => console.log(err))
            }
            else if (prevTicket.returnTicket) {
                const token_allold_seatlists_flightid = {
                    token: sessionStorage.getItem('token'),
                    flightId: prevTicket.returnTicket.flight,
                    firstSeatsAdults: prevTicket.returnTicket.firstSeatsAdults,
                    businessSeatsAdults: prevTicket.returnTicket.businessSeatsAdults,
                    economySeatsAdults: prevTicket.returnTicket.economySeatsAdults,
                    firstSeatsChildren: prevTicket.returnTicket.firstSeatsChildren,
                    businessSeatsChildren: prevTicket.returnTicket.businessSeatsChildren,
                    economySeatsChildren: prevTicket.returnTicket.economySeatsChildren
                }
                await axios.patch('http://localhost:8082/api/flights/flightcancelseats/', token_allold_seatlists_flightid)
                const token_oldTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    returnTicket: prevTicket.returnTicket,
                    reservationNumber: prevTicket.resNo
                }
                //await axios.patch('http://localhost:8082/api/reservations/cancelhalfreservation/', token_oldTicket_reservNo)
                    //.catch(err => console.log(err))

                const token_newTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    returnTicket: newTicket,
                    reservationNumber: prevTicket.resNo
                }
                await axios.patch('http://localhost:8082/api/reservations/bookhalfreservation/', token_newTicket_reservNo)
                    .catch(err => console.log(err))
            }
            const token_newSeats = {
                token: sessionStorage.getItem('token'),
                flightId: newTicket.flight,
                firstSeatsAdults: newTicket.firstSeatsAdults,
                businessSeatsAdults: newTicket.businessSeatsAdults,
                economySeatsAdults: newTicket.economySeatsAdults,
                firstSeatsChildren: newTicket.firstSeatsChildren,
                businessSeatsChildren: newTicket.businessSeatsChildren,
                economySeatsChildren: newTicket.economySeatsChildren
            }

            await axios.patch('http://localhost:8082/api/flights/flightbookseats/', token_newSeats)
                .catch(err => console.log(err))
        }

sessionStorage.removeItem('newTicket')
        sessionStorage.removeItem('Ticket')
        sessionStorage.removeItem('seatsData')

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
