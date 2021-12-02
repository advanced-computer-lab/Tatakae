import React from "react";
import {
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper
} from "@mui/material";
import Seat from "./Seat";
import "../../css/Plane.css";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const colors = {
  availableColor: "green",
  selectedColor: "blue",
  occupiedColor: "grey",
};

const user= JSON.parse(sessionStorage.getItem('signedUser'));

export default function Plane(props) {
  const { id } = useParams();

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [childSelected, setChildSelected] = React.useState(false);
  const [businessSelected, setBusinessSelected] = React.useState([]);
  const [firstSelected, setFirstSelected] = React.useState([]);
  const [economySelected, setEconomySelected] = React.useState([]);
  const [flight, setFlight] = React.useState({});
  const [notFound, setNotFound] = React.useState(false);

  let code = 65;

  const splitArray = (seatArray) => {
    var rows = [];
    for (var i = 0; i < seatArray.length; i += 6) {
      rows.push(seatArray.slice(i, i + 6));
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

  const handleConfirm = () => {
    const economySeatsAdults= economySelected.filter(e=> e.isChild===false).map(e=>e.seatIndex)
    const businessSeatsAdults= businessSelected.filter(e=> e.isChild===false).map(e=>e.seatIndex)
    const firstSeatsAdults= firstSelected.filter(e=> e.isChild===false).map(e=>e.seatIndex)

    const economySeatsChildren= economySelected.filter(e=> e.isChild===true).map(e=>e.seatIndex)
    const businessSeatsChildren= businessSelected.filter(e=> e.isChild===true).map(e=>e.seatIndex)
    const firstSeatsChildren= firstSelected.filter(e=> e.isChild===true).map(e=>e.seatIndex)

    const deptTicket={

    }

    const data={}
  }

  useEffect(() => {
    axios.get(`http://localhost:8082/api/flights/flightget/${id}`).then(res => {
      setFlight(res.data);
    }).catch(err => {
      setNotFound(true)
    })
  }, [])

  useEffect(
    () => { },
    [businessSelected],
    [flight.economySeats],
    [firstSelected],
    //[selectedCount],
    [totalPrice],
    [childSelected]
  );

  return (
    <Grid>
      {notFound && <Navigate to='/wrongURL' />}
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
        <Paper elevation={10} style={{width: "300px"}}> 
          Business
          {splitArray([].concat(flight.businessSeats)).map((row, rowNumber) => (
            <Grid key={rowNumber} class="row">
              {row.map((element, seatNumber) => (
                <Seat
                  key={seatNumber + 6 * rowNumber}
                  seatIndex={seatNumber + 6 * rowNumber}
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
                  key={seatNumber + 6 * rowNumber}
                  seatIndex={seatNumber + 6 * rowNumber}
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
                  key={seatNumber + 6 * rowNumber}
                  seatIndex={seatNumber + 6 * rowNumber}
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
          </Paper>
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
            onClick={handleConfirm}>
            Confirm Reservation
          </Button>
        </Grid>
      </Grid>
      {notFound && (<Navigate to='/randomURL' />)}
    </Grid>
  );
}
