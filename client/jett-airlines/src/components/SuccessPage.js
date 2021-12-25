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
        /* const deptTicket = {
            flight: flight._id,
            from: flight.from,
            to: flight.to,
            departureTerminal: flight.departureTerminal,
            arrivalTerminal: flight.arrivalTerminal,
            departureDate: new Date(flight.departureDate),
            arrivalDate: new Date(flight.arrivalDate),
            economySeatsAdults: economySeatsAdults,
            businessSeatsAdults: businessSeatsAdults,
            firstSeatsAdults: firstSeatsAdults,
            economySeatsChildren: economySeatsChildren,
            businessSeatsChildren: businessSeatsChildren,
            firstSeatsChildren: firstSeatsChildren,
            totalPrice: totalPrice

            const dataBooks = {
      token: sessionStorage.getItem('token'),
      economySeatsAdults: economySeatsAdults,
      businessSeatsAdults: businessSeatsAdults,
      firstSeatsAdults: firstSeatsAdults,
      economySeatsChildren: economySeatsChildren,
      businessSeatsChildren: businessSeatsChildren,
      firstSeatsChildren: firstSeatsChildren,
      flightId: flight._id
    }
        }*/
        const prevTicket = JSON.parse(sessionStorage.getItem('Ticket'));
        const newTicket = JSON.parse(sessionStorage.getItem('newTicket'));

        if (prevTicket) {
            const token_allold_seatlists_flightid = {
                token: sessionStorage.getItem('token'),
                flightId: prevTicket.flight,
                firstSeatsAdults: prevTicket.firstSeatsAdults,
                businessSeatsAdults: prevTicket.businessSeatsAdults,
                economySeatsAdults: prevTicket.economySeatsAdults,
                firstSeatsChildren: prevTicket.firstSeatsChildren,
                businessSeatsChildren: prevTicket.businessSeatsChildren,
                economySeatsChildren: prevTicket.economySeatsChildren
            }
            await axios.patch('http://localhost:8082/api/flights/flightcancelseats/', token_allold_seatlists_flightid)
            if (prevTicket.departureTicket) {
                const token_oldTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    departureTicket: prevTicket.departureTicket,
                    reservationNumber: prevTicket.resNo
                }
                await axios.patch('http://localhost:8082/api/reservations/cancelhalfreservation/', token_oldTicket_reservNo)
                    .catch(err => console.log(err))

                const token_newTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    departureTicket: newTicket,
                    reservationNumber: prevTicket.resNo
                }
                await axios.patch('http://localhost:8082/api/reservations/bookhalfreservation/', token_newTicket_reservNo)
                    .catch(err => console.log(err))
            }
            else if (prevTicket.returnTicket) {
                const token_oldTicket_reservNo = {
                    token: sessionStorage.getItem('token'),
                    returnTicket: prevTicket.returnTicket,
                    reservationNumber: prevTicket.resNo
                }
                await axios.patch('http://localhost:8082/api/reservations/cancelhalfreservation/', token_oldTicket_reservNo)
                    .catch(err => console.log(err))

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
