import React from "react";
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

let economySeats = [
  Boolean(true),
  Boolean(false),
  Boolean(true),
  Boolean(true),
  Boolean(false),
  Boolean(true),
  Boolean(false),
  Boolean(true),
];

let businessSeats = [
  Boolean(true),
  Boolean(false),
  Boolean(true),
  Boolean(true),
  Boolean(true),
  Boolean(true),
  Boolean(false),
  Boolean(true),
];

let firstSeats = [
  Boolean(true),
  Boolean(false),
  Boolean(true),
  Boolean(true),
  Boolean(false),
  Boolean(false),
  Boolean(false),
  Boolean(true),
];

let businessPrice = 3000;

let firstPrice = 2000;

let economyPrice = 1000;

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

  useEffect(
    () => {},
    [BusinessSelected],
    [economySeats],
    [firstSelected],
    //[selectedCount],
    [totalPrice],
    [childSelected]
  );

  return (
    <Grid>
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
        </Grid>
      </Grid>
    </Grid>
  );
}
