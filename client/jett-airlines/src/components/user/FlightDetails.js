import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import {Card, CardMedia, CardActionArea, Typography} from '@mui/material';

export default function FlightDetails(props) {
    const flight=props.flight
    const diffMs = (new Date(flight.arrivalDate) - new Date(flight.departureDate));
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return (
            <Card >
                <CardMedia image="../../assets/world.jpg" >

                </CardMedia>
            </Card>
    )
}


                /*
                <CardActionArea>
                    <AirplaneTicketIcon color="primary" sx={{ fontSize: 150 }} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ fontStyle: 'oblique' }}>
                            Flight Number: {flight.flightNumber}
                            <br/>
                            Terminal: {flight.airportTerminal}
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
                            Available First Class Seats: {flight.availableFirstSeats}
                            <br/>
                            Price of First Class: {flight.firstPrice}
                            <br/>
                            First Class Baggage Allowance: {flight.firstBaggage}
                            <br/>
                            Available Business Seats: {flight.availableBusinessSeats}
                            <br/>
                            Price of Business: {flight.businessPrice}
                            <br/>
                            Business Class Baggage Allowance: {flight.businessBaggage} 
                            <br/>
                            Available Economy Seats: {flight.availableEconomySeats}
                            <br/>
                            Price of Economy: {flight.economyPrice}
                            <br/>
                            Economy Class Baggage Allowance: {flight.economyBaggage}
                            <br/>
                            Available Seats: {flight.availableTotalSeats}
                            <br/>
                            Trip Duration: {diffHrs} Hours {diffMins} Minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
                */