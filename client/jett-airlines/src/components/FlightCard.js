import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FlightCard(props) {
    return (
        <div className='center'>
            <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
      <AirplaneTicketIcon color="primary" sx={{ fontSize: 50 }}/>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            From Cairo To Jeddah
          </Typography>
          <Typography variant="body2" color="text.secondary">
            18/05/2020
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
        </div>
    )
}
