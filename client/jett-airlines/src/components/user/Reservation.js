import { React, useEffect, useState, forwardRef } from "react";
import FlightDetails from "./FlightDetails";
import FlightCard from "./FlightCard";
import TicketCard from "./TicketCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { Typography, Toolbar, AppBar } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import emailjs from "emailjs-com";
import blueTexture1 from "../../assets/blueTexture1.png";
import blueTexture2 from "../../assets/blueTexture2.png";
import { Box } from "@mui/system";
import Config from "../../config.json";
emailjs.init(Config.EMAIL_USER_ID);



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reservation(props) {
  const [deptFlight, setDeptFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);

  const [deptFirst, setDeptFirst] = useState(null);
  const [deptBusiness, setDeptBusiness] = useState(null);
  const [deptEco, setDeptEco] = useState(null);

  const [returnFirst, setReturnFirst] = useState(null);
  const [returnBusiness, setReturnBusiness] = useState(null);
  const [returnEco, setReturnEco] = useState(null);

  const [returnFlights, setReturnFlights] = useState([]);
  const [returnFlightsPop, setReturnFlightsPop] = useState(false);
  const [noReturns, setNoReturns] = useState(false);
  const [returnPop, setReturnPop] = useState(false);
  const [cancelPop, setCancelPop] = useState(false);
  const [emailPop, setEmailPop] = useState(false);

  const getSeats = (seats, n) => {
    var code = 65;
    var returnSeats = [];
    for (var i = 0; i < seats.length; i++) {
      var mod = seats[i] % 8;
      returnSeats.push({
        seatNumber:
          String.fromCharCode(code + mod) + (Math.floor(seats[i] / 8) + n + 1),
      });
    }
    //console.log(returnSeats);
    return returnSeats;
  };

  useEffect(() => {
    if (props.reservation.departureFlight) {
      axios
        .get(
          `http://localhost:8082/api/flights/flightget/${props.reservation.departureFlight}`
        )
        .then((res) => {
          setDeptFlight(res.data);
          let x = getSeats(
            []
              .concat(props.reservation.departureTicket.firstSeatsChildren)
              .concat(props.reservation.departureTicket.firstSeatsAdults),
            0
          );
          setDeptFirst(x);
          x = getSeats(
            []
              .concat(props.reservation.departureTicket.businessSeatsChildren)
              .concat(props.reservation.departureTicket.businessSeatsAdults),
            Math.ceil([].concat(res.data.firstSeats).length / 8)
          );
          setDeptBusiness(x);
          x = getSeats(
            []
              .concat(props.reservation.departureTicket.economySeatsChildren)
              .concat(props.reservation.departureTicket.economySeatsAdults),
            Math.ceil([].concat(res.data.firstSeats).length / 8) +
              Math.ceil([].concat(res.data.businessSeats).length / 8)
          );
          setDeptEco(x);
          /*
                    setDeptFirst((getSeats([].concat(props.reservation.departureTicket.firstSeatsChildren).concat(props.reservation.departureTicket.firstSeatsAdults)), (Math.floor([].concat(res.data.firstSeats).length) + 1)));
                    setDeptBusiness((getSeats([].concat(props.reservation.departureTicket.businessSeatsChildren).concat(props.reservation.departureTicket.businessSeatsAdults))), (Math.floor([].concat(res.data.firstSeats).length) + Math.floor([].concat(res.data.businessSeats).length) + 1));
                    setDeptEco((getSeats([].concat(props.reservation.departureTicket.economySeatsChildren).concat(props.reservation.departureTicket.economySeatsAdults))), (Math.floor([].concat(res.data.firstSeats).length) + Math.floor([].concat(res.data.businessSeats).length)  + Math.floor([].concat(res.data.economySeats).length) + 1));
                    */
          //console.log(Math.floor([].concat(res.data.firstSeats).length));
          //  console.log(Math.floor([].concat(res.data.businessSeats).length));
        })
        .catch((err) => console.log(err));
    }

    if (props.reservation.returnFlight) {
      axios
        .get(
          `http://localhost:8082/api/flights/flightget/${props.reservation.returnFlight}`
        )
        .then((res) => {
          setReturnFlight(res.data);

          let x = getSeats(
            []
              .concat(props.reservation.returnTicket.firstSeatsChildren)
              .concat(props.reservation.returnTicket.firstSeatsAdults),
            0
          );
          setReturnFirst(x);
          x = getSeats(
            []
              .concat(props.reservation.returnTicket.businessSeatsChildren)
              .concat(props.reservation.returnTicket.businessSeatsAdults),
            Math.ceil([].concat(res.data.firstSeats).length / 8)
          );
          setReturnBusiness(x);
          x = getSeats(
            []
              .concat(props.reservation.returnTicket.economySeatsChildren)
              .concat(props.reservation.returnTicket.economySeatsAdults),
            Math.ceil([].concat(res.data.firstSeats).length / 8) +
              Math.ceil([].concat(res.data.businessSeats).length / 8)
          );
          setReturnEco(x);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const styles = {
    background1: {
      width: "600px",
      backgroundImage: `url(${blueTexture1})`,
      borderRadius: "16px",
      backgroundRepeat: "no-repeat"
      
    },
    background2: {
      width: "600px",
      backgroundImage: `url(${blueTexture2})`,
      borderRadius: "16px",
      backgroundRepeat: "no-repeat"
    }
  };

  const handleCancelClick = () => {
    setCancelPop(true);
  };

  const handleEmailClick=()=>{
    setEmailPop(true)
  }

  const handleYesCancel = () => {

    axios
      .delete(
        `http://localhost:8082/api/reservations/deletefullreservation/${props.reservation._id}`,
        { data: { token: sessionStorage.getItem("token") } }
      )
      .then(() => {
        setCancelPop(false);
        props.setRefresh(!props.refresh);
        
      });

    if (props.reservation.departureTicket) {
      const data = {
        token: sessionStorage.getItem("token"),
        flightId: props.reservation.departureFlight,
        economySeatsAdults:
          props.reservation.departureTicket.economySeatsAdults,
        firstSeatsAdults: props.reservation.departureTicket.firstSeatsAdults,
        businessSeatsAdults:
          props.reservation.departureTicket.businessSeatsAdults,
        economySeatsChildren:
          props.reservation.departureTicket.economySeatsChildren,
        firstSeatsChildren:
          props.reservation.departureTicket.firstSeatsChildren,
        businessSeatsChildren:
          props.reservation.departureTicket.businessSeatsChildren,
      };

      axios
        .patch("http://localhost:8082/api/flights/flightcancelseats/", data)
        .then(()=>{
          let variables = {
            ticketNumber: props.reservation.departureTicket.ticketNumber,
            totalPrice: props.reservation.departureTicket.totalPrice,
            email: props.reservation.email
          }
          emailjs
            .send(
              Config.EMAIL_SERVICE_ID,
              Config.EMAIL_TEMPLATE_ID,
              variables
            )
            .then((res) => {
              console.log("Email successfully sent for departure ticket!");
            })
            .catch((err) =>
              console.error(
                "Oh well, you failed. Here some thoughts on the error that occured:",
                err
              )
            );
        })
        .catch((err) => console.log(err));
    }
    if (props.reservation.returnTicket) {
      const data = {
        token: sessionStorage.getItem("token"),
        flightId: props.reservation.returnFlight,
        economySeatsAdults: props.reservation.returnTicket.economySeatsAdults,
        firstSeatsAdults: props.reservation.returnTicket.firstSeatsAdults,
        businessSeatsAdults:
          props.reservation.returnTicket.businessSeatsAdults,
        economySeatsChildren:
          props.reservation.returnTicket.economySeatsChildren,
        firstSeatsChildren: props.reservation.returnTicket.firstSeatsChildren,
        businessSeatsChildren:
          props.reservation.returnTicket.businessSeatsChildren,
      };

      axios
        .patch("http://localhost:8082/api/flights/flightcancelseats/", data)
        .then(() => {
          let variables = {
            ticketNumber: props.reservation.returnTicket.ticketNumber,
            totalPrice: props.reservation.returnTicket.totalPrice,
            email: props.reservation.email,
          };
          emailjs
            .send(
              Config.EMAIL_SERVICE_ID,
              Config.EMAIL_TEMPLATE_ID,
              variables
            )
            .then((res) => {
              console.log("Email successfully sent for return ticket!");
            })
            // Handle errors here however you like, or use a React error boundary
            .catch((err) =>
              console.error(
                "Oh well, you failed. Here some thoughts on the error that occured:",
                err
              )
            );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleNoCancel = () => {
    setCancelPop(false);
  };

  const handleNoEmail=()=>{
    setEmailPop(false);
  }

  const handleYesEmail=()=>{
    //accumulate message string from frontend to pass it to email.js
    let variables = {email: props.reservation.email}

    emailjs.send(
      Config.EMAIL_SERVICE_ID,Config.EMAIL_DETAILS_TEMPLATE_ID,
      variables
      ).then(res => {
        console.log('Email successfully sent!')
      })
  }

  return (
    <Grid container sx={{justify:"space-around"}}
    spacing={3}>
      {deptFlight &&(!returnFlight) && 
      ( <Grid item  xs={12}style={styles.background1}>
      <Grid container direction={"column"}>
        <Grid item>
        <Typography style={{ color: "#ffffff", fontSize: "3em"}}sx={{margin:"70px 0 0 150px" }}>
          Reservation
        </Typography>
        </Grid>
        <Grid item>
        <Typography style={{ color: "#ffffff", fontSize: "2em",margin:"0 0 0 150px" }}>
         {props.reservation.reservationNumber}
        </Typography>
        </Grid>
      </Grid>

      <Grid sx={{ margin: "170px 0 0 33px",paddingBottom:"70px" }}>
          <TicketCard
            flight={deptFlight}
            firstSelected={deptFirst}
            businessSelected={deptBusiness}
            economySelected={deptEco}
            totalPrice={props.reservation.departureTicket.totalPrice}
          />
        
        {returnFlight && (
          <TicketCard
            flight={returnFlight}
            firstSelected={returnFirst}
            businessSelected={returnBusiness}
            economySelected={returnEco}
            totalPrice={props.reservation.returnTicket.totalPrice}
          />
        )}<br/><br/>
        <Button onClick={handleEmailClick}>
          <Typography style={{ color: "#ffffff" }}>
            Email Details
          </Typography>
        </Button>
        <Button onClick={handleCancelClick}>
          <Typography style={{ color: "#ffffff" }}>
            Cancel Reservation
          </Typography>
        </Button>
        <Dialog
          open={cancelPop}
          TransitionComponent={Transition}
          onClose={handleNoCancel}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are you sure you want to cancel this reservation?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleYesCancel} size="small" color="primary">
              Yes
            </Button>
            <Button onClick={handleNoCancel}>No</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={emailPop}
          TransitionComponent={Transition}
          onClose={handleNoEmail}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Email myself this reservation's details?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleYesEmail} size="small" color="primary">
              Yes
            </Button>
            <Button onClick={handleNoEmail}>No</Button>
          </DialogActions>
        </Dialog>

        {/* <Dialog
                open={returnPop}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to reserve a return flight?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleYesReturn} size="small" color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleNoReturn}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={noReturns}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Alert severity="info" variant="filled"
                    action={
                        <Button onClick={handleNoReturn} color="inherit" size="small" variant="outlined">
                            Back to Home
                        </Button>
                    }
                >
                    Sorry this flight has no returns.
                </Alert>
            </Dialog>

            <Dialog
                open={returnFlightsPop}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Return Flights"}</DialogTitle>
                <DialogContent style={{ alignItems: "center", minWidth: "350px", minHeight: "400" }}>
                    {returnFlights.map(f => <FlightCard key={f._id} flight={f} return={true} />)}
                </DialogContent>
            </Dialog> */}
      </Grid>
    </Grid>
        )}
        {returnFlight && (
           <Grid item  xs={12}style={styles.background2}>
      <Grid container direction={"column"}>
        <Grid item>
        <Typography style={{ color: "#ffffff", fontSize: "3em"}}sx={{margin:"70px 0 0 150px" }}>
          Reservation
        </Typography>
        </Grid>
        <Grid item>
        <Typography style={{ color: "#ffffff", fontSize: "2em",margin:"0 0 0 150px" }}>
         {props.reservation.reservationNumber}
        </Typography>
        </Grid>
      </Grid>

      <Grid sx={{ margin: "170px 0 0 33px",paddingBottom:"70px" }}>
        {deptFlight && (
          <TicketCard
            flight={deptFlight}
            firstSelected={deptFirst}
            businessSelected={deptBusiness}
            economySelected={deptEco}
            totalPrice={props.reservation.departureTicket.totalPrice}
          />
        )}
        {returnFlight && (
          <TicketCard
            flight={returnFlight}
            firstSelected={returnFirst}
            businessSelected={returnBusiness}
            economySelected={returnEco}
            totalPrice={props.reservation.returnTicket.totalPrice}
          />
        )}<br/><br/>
        <Button onClick={handleEmailClick}>
          <Typography style={{ color: "#ffffff" }}>
            Email Details
          </Typography>
        </Button>
        <Button onClick={handleCancelClick}>
          <Typography style={{ color: "#ffffff" }}>
            Cancel Reservation
          </Typography>
        </Button>
        <Dialog
          open={cancelPop}
          TransitionComponent={Transition}
          onClose={handleNoCancel}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are you sure you want to cancel this reservation?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleYesCancel} size="small" color="primary">
              Yes
            </Button>
            <Button onClick={handleNoCancel}>No</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={emailPop}
          TransitionComponent={Transition}
          onClose={handleNoEmail}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Email myself this reservation's details?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleYesEmail} size="small" color="primary">
              Yes
            </Button>
            <Button onClick={handleNoEmail}>No</Button>
          </DialogActions>
        </Dialog>

        {/* <Dialog
                open={returnPop}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Do you want to reserve a return flight?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleYesReturn} size="small" color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleNoReturn}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={noReturns}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <Alert severity="info" variant="filled"
                    action={
                        <Button onClick={handleNoReturn} color="inherit" size="small" variant="outlined">
                            Back to Home
                        </Button>
                    }
                >
                    Sorry this flight has no returns.
                </Alert>
            </Dialog>

            <Dialog
                open={returnFlightsPop}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Return Flights"}</DialogTitle>
                <DialogContent style={{ alignItems: "center", minWidth: "350px", minHeight: "400" }}>
                    {returnFlights.map(f => <FlightCard key={f._id} flight={f} return={true} />)}
                </DialogContent>
            </Dialog> */}
      </Grid>
    </Grid>
        )}
   
    </Grid>
  );
}
