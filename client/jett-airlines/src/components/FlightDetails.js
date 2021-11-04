import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function FlightDetails(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 350 }}>
                <CardActionArea>
                    <AirplaneTicketIcon color="primary" sx={{ fontSize: 100 }} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                            Flight Number: {props.flight.flightNumber}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            From {props.flight.from} To {props.flight.to}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.flight.departureDate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
