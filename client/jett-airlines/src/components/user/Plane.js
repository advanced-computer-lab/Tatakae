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

const colors = {
  availableColor: "green",
  selectedColor: "blue",
  occupiedColor: "grey",
};

export default function Plane(props) {
  //const [selectedCount, setSelectedCount] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [childSelected, setChildSelected] = React.useState(false);
  const [BusinessSelected, setBusinessSelected] = React.useState([]);
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
    setToHome(true);
  }

  const handleOpen=()=>{
    setConfirmPop(true);
  }

  const handleYesReturn = async () => {
    sessionStorage.setItem('reservationNumber', reservationNumber);
    setReturnPop(false);

    const data={
      token: sessionStorage.getItem('token'),
      departureTicket: departureTicket
    }

    await axios.post('http://localhost:8082/api/flights/getdeparture0retrun', data).then(res=>setReturnFlights(res.data))
    .then(()=>setReturnFlightsPop(true))
    .catch(err=>console.log(err))
    //await axios call to get return flights by passing {departureTicket:departureTicket} and setting returnFlights.
  }

  const handleConfirm = async () => {

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

      <Dialog
        open={returnFlightsPop}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Return Flights"}</DialogTitle>
        <DialogContent>
          {returnFlights.map(f=><FlightCard key={f._id} flight={f} return={true}/>)}
        </DialogContent>
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
          {splitArray(businessSeats).map((row, rowNumber) => (
            <Grid class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={businessPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) + (1 + rowNumber)
                  }
                  //selectedCount={selectedCount}
                  //setSelectedCount={setSelectedCount}
                  selected={BusinessSelected}
                  setSelected={setBusinessSelected}
                />
              ))}
            </Grid>
          ))}
          First
          {splitArray(firstSeats).map((row, rowNumber) => (
            <Grid class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={firstPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) +
                    (1 + rowNumber + splitArray(businessSeats).length)
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
          {splitArray(economySeats).map((row, rowNumber) => (
            <Grid class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  seatIndex={seatNumber + 8 * rowNumber}
                  isChild={childSelected}
                  price={economyPrice}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  available={element}
                  colors={colors}
                  seatNumber={
                    String.fromCharCode(code + seatNumber) +
                    (1 +
                      rowNumber +
                      splitArray(businessSeats).length +
                      splitArray(firstSeats).length)
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
              {BusinessSelected.length +
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
           Reserve Seat(s)
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
