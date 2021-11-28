import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import FlightDetails from './FlightDetails';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FlightCard(props) {

  const [openDetails, setOpenDetails] = React.useState(false);
  const [openLogIn, setOpenLogIn] = React.useState(false);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleReserveClick=()=>{
    if(JSON.parse(sessionStorage.getItem('signedUser'))){
      //hakamel
    }
  }

    return (
        <div className='center'>
            <Card sx={{ maxWidth: 350 }} elevation={10}>
      <CardActionArea>
      <AirplaneTicketIcon color="primary" sx={{ fontSize: 50 }}/>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            From {props.flight.from} To {props.flight.to}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(props.flight.departureDate).toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleClickOpenDetails} size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
      
      <Dialog
        open={openDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseDetails}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Flight Details"}</DialogTitle>
        <DialogContent>
            <FlightDetails flight={props.flight}/>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleReserveClick} size="small" color="primary">
          Reserve
        </Button>
          <Button onClick={handleClickCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
