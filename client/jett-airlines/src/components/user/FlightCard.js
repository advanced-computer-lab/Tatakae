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
import TicketDetails from './TicketDetails';
import { Navigate } from 'react-router-dom';

import Plane from './Plane'
import '../../css/flightCard.css'
var img="";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function timeDiffCalc(dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
}
export default function FlightCard(props) {

  const [openDetails, setOpenDetails] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [toSignIn, setToSignIn] = React.useState(false);
  const [toPlane, setToPlane] = React.useState(false);
  const [toReturnPlane, setToReturnPlane]= React.useState(false);

 
  if(props.flight.to==="LAX"){
    img="https://s26162.pcdn.co/wp-content/uploads/2019/07/los-angeles-echo-park.jpg";
  }  else  if(props.flight.to==="JFK"){
    img="http://yourusacityguide.com/wp-content/uploads/2021/03/Queens.jpg";
  } 
  else  if(props.flight.to==="LHR"){
    img="https://www.checkin.pk/frontend/tours/images/brands/tours/lahore.jpg";
  }
  else  if(props.flight.to==="DXB"){
    img="http://www.travelinbusiness.co.uk/gallery/dubai.png";
  } 
  else  if(props.flight.to==="CAI"){
    img="http://vancouvertravel.net/wp-content/uploads/%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D9%82%D8%A7%D9%87%D8%B1%D8%A9.jpg";
  } 
  else  if(props.flight.to==="MUC"){
    img="https://w0.peakpx.com/wallpaper/406/31/HD-wallpaper-munich-city-building-cars-city-lights.jpg";
  }
  else  if(props.flight.to==="CDG"){
    img="http://www.agazaonline.com/media/k2/galleries/390/nature-cloud-ocean-cliff-landscape-city-paris-ultrahd-4k-wallpaper-198277.jpg";
  } 
  else  if(props.flight.to==="MUC"){
    img="https://w0.peakpx.com/wallpaper/406/31/HD-wallpaper-munich-city-building-cars-city-lights.jpg";
  } 
  else  if(props.flight.to==="RUH"){
    img="https://i.pinimg.com/originals/35/42/23/3542239c76506917a3254ee3a8e88b8d.png";
  } 
  else  if(props.flight.to==="YYZ"){
    img="https://w0.peakpx.com/wallpaper/350/209/HD-wallpaper-cities-toronto.jpg";
  }  else{
    img="";
  }

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleReserveClick = () => {
    if (JSON.parse(sessionStorage.getItem('signedUser'))) {
      props.return? setToReturnPlane(true) : setToPlane(true);
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
      <div class='main3'>
     <div class="card">

   
    <img src={img} alt="New York" class="image"/>
    <div class="section">
      <p class="section__from section__airport">{props.flight.from}</p>
      <p class="section__to section__airport">{props.flight.to}</p>
      <dl class="info">
        <div class="info__section info__section--first">
          <dt>Departure date</dt>
          <dd> {new Date(props.flight.departureDate).toLocaleString()}</dd>

          <dt>Seats</dt>
          <dd>{props.flight.availableTotalSeats}</dd>
        </div>
        <div class="info__section">
          <dt>Departure Terminal</dt>
          <dd>{props.flight.departureTerminal}</dd>

          <dt>Arrival Terminal </dt>
          <dd>{props.flight.arrivalTerminal}</dd>
        </div>
      </dl>
      
     <Button onClick={handleClickOpenDetails} size="small" color="primary">
            View Details
          </Button>
    </div>
  </div>
  </div>
      <Dialog style={{
    }}
        open={openDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseDetails}
        aria-describedby="alert-dialog-slide-description"
      >
        {/*<div style={{backgroundColor:"#4287f5"}}>
        <DialogTitle ><Typography style={{color: "#ffffff"}}>
        Flight Details
      </Typography></DialogTitle></div>
  */}
        <DialogContent style={{paddingLeft:'0', paddingRight:'0',paddingTop:'0' , overflowX: "hidden"}}>
          <FlightDetails  flight={props.flight} />
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
      {toPlane && (<Navigate to={`/Plane/${props.flight._id}`}/>)}
      {toReturnPlane && (<Navigate to={`/ReturnPlane/${props.flight._id}`}/>)}
    </div>
  );
}
