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
import EditFlight from './EditFlight';
import emailjs from 'emailjs-com';
import Config from "../../config.json";

emailjs.init(Config.EMAIL_USER_ID);


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FlightCard(props) {

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openEdit, setOpenEdit]= React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleClickCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleYes = () => {
      axios.delete(`http://localhost:8082/api/flights/flightdelete/${props.flight._id}`, { data: { token: sessionStorage.getItem('token') } }).then(()=>{
        setOpenDelete(false);
        props.setRefresh(!props.refresh)
      })
      
      axios.delete('http://localhost:8082/api/reservations/reservationsdeleteforflight/', { data: { token: sessionStorage.getItem('token') , flight:props.flight._id } }).then( res=> {
      
      for (var i = 0 ; i <res.data.length ; i ++){
        let variables = {ticketNumber: res.data[i].ticketNumber ,totalPrice: res.data[i].totalPrice ,email: res.data[i].email}
      
        emailjs.send(
        Config.EMAIL_SERVICE_ID,Config.EMAIL_TEMPLATE_ID,
        variables
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
      })// end of then
      

  };

  const handleNo=()=>{
    setOpenDelete(false)
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
        <Button onClick={handleClickOpenEdit} size="small" color="primary">
          Edit
        </Button>
        <Button onClick = {handleClickOpenDelete} size="small" color="primary">
          Delete
        </Button>
        <Button onClick={handleClickOpenDetails} size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>

    
      <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleNo}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Flight?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this flight?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      
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
          <Button onClick={handleClickCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickCloseEdit}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Flight"}</DialogTitle>
        <DialogContent>
            <EditFlight flight={props.flight} closeDialog={handleClickCloseEdit} refresh={props.refresh} setRefresh={props.setRefresh}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseEdit}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>


        

    );
}
