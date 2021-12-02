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
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FlightDetails from './FlightDetails';
import Alert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FlightCard(props) {

  const [openDetails, setOpenDetails] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [toSignIn, setToSignIn] = React.useState(false);

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleReserveClick = () => {
    if (JSON.parse(sessionStorage.getItem('signedUser'))) {
      //hakamel
    }
    else {
      setOpenDetails(false);
      setOpenAlert(true);
    }
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  const redirectSignIn = ()=>{
    setToSignIn(true)
  }

  return (
    <div className='center'>
      <Card sx={{ maxWidth: 350 }} elevation={10}>
        <CardActionArea>
          <AirplaneTicketIcon color="primary" sx={{ fontSize: 50 }} />

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
          <FlightDetails flight={props.flight} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReserveClick} size="small" color="primary">
            Reserve Seats
          </Button>
          <Button onClick={handleClickCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlert}
        aria-describedby="alert-dialog-slide-description"
      >
        
          <Alert severity="error" variant="filled"
            action={
              <Button onClick={redirectSignIn} color="inherit" size="small" variant="outlined">
                Sign In
              </Button>
            }
          >
            You cannot reserve seats as a guest. Please sign in.
          </Alert>
        
      </Dialog>
      {toSignIn && (<Navigate to='/logIn'/>)}
    </div>
  );
}
