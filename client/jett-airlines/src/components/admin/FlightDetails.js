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
                            Economy Seats: {[].concat(flight.economySeats).length}
                            <br/>
                            Business Seats: {[].concat(flight.businessSeats).length}
                            <br/>
                            First Class Seats: {[].concat(flight.firstSeats).length}
                            <br/>
                            Total Number Seats: {flight.totalSeats}
                            <br/>
                            Price of Economy: {flight.economyPrice}
                            <br/>
                            Price of Business: {flight.businessPrice}
                            <br/>
                            Price of First Class: {flight.firstPrice}
                            <br/>
                            Baggage Allowance: {flight.baggageAllowance}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
