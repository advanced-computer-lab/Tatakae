import React from "react";
import axios from "axios";
import {
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Seat from "./Seat";
import "../../css/Plane.css";
import { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FlightCard from "./FlightCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const colors = {
  availableColor: "green",
  selectedColor: "blue",
  occupiedColor: "grey",
};

export default function Plane(props) {
  const { id } = useParams();
  const user = JSON.parse(sessionStorage.getItem('signedUser'));

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [childSelected, setChildSelected] = React.useState(false);
  const [businessSelected, setBusinessSelected] = React.useState([]);
  const [firstSelected, setFirstSelected] = React.useState([]);
  const [economySelected, setEconomySelected] = React.useState([]);
  const [flight, setFlight] = React.useState({});
  const [notFound, setNotFound] = React.useState(false);
  const [confirmPop, setConfirmPop] = React.useState(false);
  const [returnPop, setReturnPop] = React.useState(false);
  const [toHome, setToHome] = React.useState(false);
  const [reservationNumber, setReservationNumber] = React.useState('');
  const [departureTicket, setDepartureTicket] = React.useState(null);
  const [returnFlights, setReturnFlights] = React.useState([]);
  const [returnFlightsPop, setReturnFlightsPop] = React.useState(false);
  const [trial, setTrial]= React.useState(false);

  let code = 65;

  const splitArray = (seatArray) => {
    var rows = [];
    for (var i = 0; i < seatArray.length; i += 8) {
      rows.push(seatArray.slice(i, i + 8));
    }
    return rows;
  };

  const handleRadio = (event) => {
    if (event.target.value === "adult") {
      setChildSelected(false);
    } else {
      setChildSelected(true);
    }
  };

  const handleNo = () => {
    setConfirmPop(false);
  }

  const handleNoReturn= ()=>{

  }

  const handleYesReturn=()=>{

  }

  const handleOpen=()=>{
    setConfirmPop(true);
  }

  const handleYes = async () => {
    sessionStorage.setItem('reservationNumber', reservationNumber);
    setConfirmPop(false);

    const data={
      token: sessionStorage.getItem('token'),
      departureTicket: departureTicket
    }
    console.log(data)

    await axios.post('http://localhost:8082/api/flights/getdeparture0retrun', data).then(res=>setReturnFlights(res.data))
    .then(()=>setReturnFlightsPop(true))
    .catch(err=>console.log(err))
    //await axios call to get return flights by passing {departureTicket:departureTicket} and setting returnFlights.
  }

  const handleConfirm = async () => {
    if (JSON.parse(sessionStorage.getItem('reservationNumber'))) {
      const economySeatsAdults = economySelected.filter(e => e.isChild === false).map(e => e.seatIndex)
      const businessSeatsAdults = businessSelected.filter(e => e.isChild === false).map(e => e.seatIndex)
      const firstSeatsAdults = firstSelected.filter(e => e.isChild === false).map(e => e.seatIndex)

      const economySeatsChildren = economySelected.filter(e => e.isChild === true).map(e => e.seatIndex)
      const businessSeatsChildren = businessSelected.filter(e => e.isChild === true).map(e => e.seatIndex)
      const firstSeatsChildren = firstSelected.filter(e => e.isChild === true).map(e => e.seatIndex)

      const returnTicket = {
        flight: flight._id,
        from: flight.from,
        to: flight.to,
        departureTerminal: flight.departureTerminal,
        arrivalTerminal: flight.arrivalTerminal,
        departureDate: new Date(flight.departureDate),
        arrivalDate: new Date(flight.arrivalDate),
        economySeatsAdults: economySeatsAdults,
        businessSeatsAdults: businessSeatsAdults,
        firstSeatsAdults: firstSeatsAdults,
        economySeatsChildren: economySeatsChildren,
        businessSeatsChildren: businessSeatsChildren,
        firstSeatsChildren: firstSeatsChildren,
        totalPrice: totalPrice
      }

      const data = {
        token: sessionStorage.getItem('token'),
        returnTicket: returnTicket,
        returnFlight: flight._id,
        reservationNumber: sessionStorage.getItem('reservationNumber')
      }
      await axios.post('http://localhost:8082/api/reservations/reservationcreate/', data).then(()=>{sessionStorage.removeItem('reservationNumber')})
      .then(()=>{setToHome(true)})
      .catch(err=>console.log(err))
      //await axios call passing data, remove reservationNumber from sessionStorage,then route to home by setting toHome.
    }
    else {
      const economySeatsAdults = economySelected.filter(e => e.isChild === false).map(e => e.seatIndex)
      const businessSeatsAdults = businessSelected.filter(e => e.isChild === false).map(e => e.seatIndex)
      const firstSeatsAdults = firstSelected.filter(e => e.isChild === false).map(e => e.seatIndex)

      const economySeatsChildren = economySelected.filter(e => e.isChild === true).map(e => e.seatIndex)
      const businessSeatsChildren = businessSelected.filter(e => e.isChild === true).map(e => e.seatIndex)
      const firstSeatsChildren = firstSelected.filter(e => e.isChild === true).map(e => e.seatIndex)

      const deptTicket = {
        flight: flight._id,
        from: flight.from,
        to: flight.to,
        departureTerminal: flight.departureTerminal,
        arrivalTerminal: flight.arrivalTerminal,
        departureDate: new Date(flight.departureDate),
        arrivalDate: new Date(flight.arrivalDate),
        economySeatsAdults: economySeatsAdults,
        businessSeatsAdults: businessSeatsAdults,
        firstSeatsAdults: firstSeatsAdults,
        economySeatsChildren: economySeatsChildren,
        businessSeatsChildren: businessSeatsChildren,
        firstSeatsChildren: firstSeatsChildren,
        totalPrice: totalPrice
      }

      setDepartureTicket(deptTicket);

      const data = {
        token: sessionStorage.getItem('token'),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        departureTicket: deptTicket,
        departureFlight: flight._id,
      }

      const dataBooks={
        token: sessionStorage.getItem('token'),
        economySeatsAdults: economySeatsAdults,
        businessSeatsAdults: businessSeatsAdults,
        firstSeatsAdults: firstSeatsAdults,
        economySeatsChildren: economySeatsChildren,
        businessSeatsChildren: businessSeatsChildren,
        firstSeatsChildren: firstSeatsChildren,
        flightId: flight._id
      }

      await axios.post('http://localhost:8082/api/reservations/reservationcreate/', data).then(res=>setReservationNumber(res.data))
      .catch(err=>console.log(err))
      await axios.patch('http://localhost:8082/api/flights/flightbookseats/', dataBooks).then(()=>{
        setConfirmPop(false);
        setReturnPop(true);
      })
      .catch(err=>console.log(err))
      //await axios call for first half of reservation with data then set reservationNumber, and axios call flightreserve
      //if yes sessionStorage the reservation number and view all return flights, else redirect to home
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8082/api/flights/flightget/${id}`).then(res => {
      setFlight(res.data);
    }).catch(err => {
      setNotFound(true)
    })
  }, [])

  return (
    <Grid>

      <Dialog
        open={confirmPop}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to confirm your reservation?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} size="small" color="primary">
            Yes
          </Button>
          <Button onClick={handleNo}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
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

      {notFound && <Navigate to='/wrongURL' />}
      {toHome && <Navigate to='/home' />}

      <Grid class="plane-container">
        <List class="showcase">
          <ListItem>
            <Grid
              class="seat"
              style={{ background: colors.availableColor }}
            ></Grid>
            <small>Available</small>
          </ListItem>
          <ListItem>
            <Grid
              class="seat selected"
              style={{ background: colors.selectedColor }}
            ></Grid>
            <small>Selected</small>
          </ListItem>
          <ListItem>
            <Grid
              class="seat occupied"
              style={{ background: colors.occupiedColor }}
            ></Grid>
            <small>Occupied</small>
          </ListItem>
        </List>

        <FormControl onChange={handleRadio} component="fieldset">
          <RadioGroup
            defaultValue="adult"
            row
            aria-label="age"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="adult" control={<Radio />} label="Adult" />
            <FormControlLabel value="child" control={<Radio />} label="Child" />
          </RadioGroup>
        </FormControl>

        <Grid class="container">
          Business
          {splitArray([].concat(flight.businessSeats)).map((row, rowNumber) => (
            <Grid key={rowNumber} class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  key={seatNumber + 8 * rowNumber}
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={flight.businessPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) + (1 + rowNumber)
                  }
                  //selectedCount={selectedCount}
                  //setSelectedCount={setSelectedCount}
                  selected={businessSelected}
                  setSelected={setBusinessSelected}
                />
              ))}
            </Grid>
          ))}
          First
          {splitArray([].concat(flight.firstSeats)).map((row, rowNumber) => (
            <Grid key={rowNumber} class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  key={seatNumber + 8 * rowNumber}
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={flight.firstPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) +
                    (1 + rowNumber + splitArray([].concat(flight.businessSeats)).length)
                  }
                  //selectedCount={selectedCount}
                  //setSelectedCount={setSelectedCount}
                  selected={firstSelected}
                  setSelected={setFirstSelected}
                />
              ))}
            </Grid>
          ))}
          Economy
          {splitArray([].concat(flight.economySeats)).map((row, rowNumber) => (
            <Grid key={rowNumber} class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  key={seatNumber + 8 * rowNumber}
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={flight.economyPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) +
                    (1 +
                      rowNumber +
                      splitArray([].concat(flight.businessSeats)).length +
                      splitArray([].concat(flight.firstSeats)).length)
                  }
                  selected={economySelected}
                  setSelected={setEconomySelected}
                />
              ))}
            </Grid>
          ))}
          <p class="text">
            You have selected{" "}
            <span>
              {businessSelected.length +
                firstSelected.length +
                economySelected.length}
            </span>{" "}
            seats for the total price of <span id="total">${totalPrice}</span>
          </p>
          <Button
            type='submit'
            color='primary'
            variant="contained"
            onClick={handleOpen}>
            Confirm Reservation
          </Button>
        </Grid>
      </Grid>
      {notFound && (<Navigate to='/randomURL' />)}

    </Grid>
  );
}
