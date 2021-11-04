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

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleClickCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleYes = () => {
      axios.delete(`http://localhost:8082/api/flights/flightdelete/${props.flight._id}`).then(()=>{
        setOpenDelete(false);
        props.setRefresh(!props.refresh)
      })
  };

  const handleNo=()=>{
    setOpenDelete(false)
  }
    return (
        <div className='center'>
            <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
      <AirplaneTicketIcon color="primary" sx={{ fontSize: 50 }}/>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            From {props.flight.from} To {props.flight.to}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.flight.departureDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
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
          <DialogContentText id="alert-dialog-slide-description">
            <FlightDetails flight={props.flight}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>


        

    );
}
