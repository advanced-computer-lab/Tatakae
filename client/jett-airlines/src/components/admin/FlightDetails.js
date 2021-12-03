import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function FlightDetails(props) {
    const flight=props.flight
    return (
        <div>
            <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                    <AirplaneTicketIcon color="primary" sx={{ fontSize: 150 }} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ fontStyle: 'oblique' }}>
                            Flight Number: {flight.flightNumber}
                            <br/>
                            Departure Terminal: {flight.departureTerminal}
                            <br/>
                            Arrival Terminal: {flight.arrivalTerminal}
                            <br/>
                            From: {flight.from}                         
                            <br/>
                            To: {flight.to}
                            <br/>
                            Departure Date: {new Date(flight.departureDate).toLocaleString()}
                            <br/>
                            Arrival Date: {new Date(flight.arrivalDate).toLocaleString()}
                        </Typography>
                        <p>-------------------------------------------------------------------------------------</p>
                        <Typography variant="body2" color="text.secondary">
                            First Class Seats: {[].concat(flight.firstSeats).length}
                            <br/>
                            Price of First Class: {flight.firstPrice}
                            <br/>
                            First Class Baggage Allowance: {flight.firstBaggage}
                            <br/>
                            Business Seats: {[].concat(flight.businessSeats).length}
                            <br/>
                            Price of Business: {flight.businessPrice}
                            <br/>
                            Business Class Baggage Allowance: {flight.businessBaggage} 
                            <br/>
                            Economy Seats: {[].concat(flight.economySeats).length}
                            <br/>
                            Price of Economy: {flight.economyPrice}
                            <br/>
                            Economy Class Baggage Allowance: {flight.economyBaggage}
                            <br/>
                            Total Number Seats: {flight.totalSeats}
                            <br/>
                            Available Seats: {flight.availableTotalSeats}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
