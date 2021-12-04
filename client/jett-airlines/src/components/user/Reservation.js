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
import blueTexture from "../../assets/blueTexture.png";
import { Box } from "@mui/system";
emailjs.init(process.env.EMAIL_USER_ID);

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
    background: {
      width: "410px",
      backgroundImage: `url(${blueTexture})`,
      borderRadius: "16px",
    },
  };
  const handleonClick = () => {};

  const handleCancelClick = () => {
    setCancelPop(true);
  };

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
        .then(() => {
          let variables = {
            ticketNumber: props.reservaion.departureTicket.ticketNumber,
            totalPrice: props.reservaion.departureTicket.totalPrice,
            email: props.reservation.email,
          };
          emailjs
            .send(
              process.env.EMAIL_SERVICE_ID,
              process.env.EMAIL_TEMPLATE_ID,
              variables
            )
            .then((res) => {
              console.log("Email successfully sent!");
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
    if (props.reservation.arrivalTicket) {
      const data = {
        token: sessionStorage.getItem("token"),
        flightId: props.reservation.arrivalFlight,
        economySeatsAdults: props.reservation.arrivalTicket.economySeatsAdults,
        firstSeatsAdults: props.reservation.arrivalTicket.firstSeatsAdults,
        businessSeatsAdults:
          props.reservation.arrivalTicket.businessSeatsAdults,
        economySeatsChildren:
          props.reservation.arrivalTicket.economySeatsChildren,
        firstSeatsChildren: props.reservation.arrivalTicket.firstSeatsChildren,
        businessSeatsChildren:
          props.reservation.arrivalTicket.businessSeatsChildren,
      };

      axios
        .patch("http://localhost:8082/api/flights/flightcancelseats/", data)
        .then(() => {
          let variables = {
            ticketNumber: props.reservaion.returnTicket.ticketNumber,
            totalPrice: props.reservaion.returnTicket.totalPrice,
            email: props.reservation.email,
          };
          emailjs
            .send(
              process.env.EMAIL_SERVICE_ID,
              process.env.EMAIL_TEMPLATE_ID,
              variables
            )
            .then((res) => {
              console.log("Email successfully sent!");
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

  return (
    <Box style={styles.background}>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Typography style={{ color: "#ffffff", fontSize: "2em", ju: "center" }}>
          Reservation #{props.reservation.reservationNumber}
        </Typography>
      </Grid>

      <Grid sx={{ margin: "0 0 0 30px" }}>
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
        )}
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
    </Box>
  );
}
