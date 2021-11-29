import React from 'react'
import { Grid, Box, List, ListItem, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Seat from './Seat'
import '../../css/Plane.css'
import { useEffect } from 'react';

let economySeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false), Boolean(true), Boolean(false), Boolean(true)]

let businessSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(true), Boolean(true), Boolean(false), Boolean(true)]

let firstSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false), Boolean(false), Boolean(false), Boolean(true)]

let economyPrice = 1000;

let firstPrice = 2000;

let businessPrice = 3000;

const colors = {
    availableColor: "green",
    selectedColor: "blue",
    occupiedColor: "grey"

}

const styles = {
    bSeatStyle: {
        backgroundColor: "#444451",
        height: "2em",
        width: "2em",
        margin: "1em",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
    },
    fSeatStyle: {
        backgroundColor: "purple"
    },
    eSeatStyle: {
        backgroundColor: "red"
    },
    oSeatStyle: {
        backgroundColor: "grey"
    }
}



export default function Plane(props) {

    const [selected, setSelected] = React.useState(0);

    const [totalPrice, setTotalPrice] = React.useState(0);

    const [isChild, setIsChild] = React.useState(false);

    const splitArray = (seatArray) => {
        var rows = [[]];
        for (var i = 0; i < seatArray.length; i += 8) {
            rows.push(seatArray.slice(i, i + 8))
        }
        return rows;

    }

    const handleRadio = (event) => {
        if(event.target.value === "adult"){
            setIsChild(false);
        }
        else {
            setIsChild(true);
        }
    }

    useEffect(() => { }, [selected] , [totalPrice], [isChild])

    return (
        <Grid>
            <Grid class="plane-container">
                <List class="showcase">
                    <ListItem>
                        <Grid class="seat" style={{ background: colors.availableColor }}></Grid>
                        <small>Available</small>
                    </ListItem>
                    <ListItem>
                        <Grid class="seat selected" style={{ background: colors.selectedColor }}></Grid>
                        <small>Selected</small>
                    </ListItem>
                    <ListItem>
                        <Grid class="seat occupied" style={{ background: colors.occupiedColor }}></Grid>
                        <small>Occupied</small>
                    </ListItem>
                </List>

                <FormControl onChange={handleRadio} component="fieldset">
                    <RadioGroup defaultValue="adult" row aria-label="age" name="row-radio-buttons-group">
                        <FormControlLabel value="adult" control={<Radio />} label="Adult" />
                        <FormControlLabel value="child" control={<Radio />} label="Child" />
                    </RadioGroup>
                </FormControl>

                <Grid class="container">
                    Business
                    {splitArray(businessSeats).map(row => (
                        <Grid class="row">

                            {row.map((element, seatNumber) => (
                                <Seat isChild={isChild} price={businessPrice} totalPrice={totalPrice} setTotalPrice={setTotalPrice} available={element} colors={colors} seatNumber={seatNumber} selected={selected} setSelected={setSelected} />
                            ))}
                        </Grid>
                    ))}
                    First
                    {splitArray(firstSeats).map(row => (
                        <Grid class="row">

                            {row.map((element, seatNumber) => (
                                <Seat isChild={isChild} price={firstPrice} totalPrice={totalPrice} setTotalPrice={setTotalPrice} available={element} colors={colors} seatNumber={seatNumber} selected={selected} setSelected={setSelected} />
                            ))}
                        </Grid>
                    ))}
                    Economy
                    {splitArray(economySeats).map(row => (
                        <Grid class="row">

                            {row.map((element, seatNumber) => (
                                <Seat isChild={isChild} price={economyPrice} totalPrice={totalPrice} setTotalPrice={setTotalPrice} available={element} colors={colors} seatNumber={seatNumber} selected={selected} setSelected={setSelected} />
                            ))}
                        </Grid>
                    ))}


                    <p class="text">
                        You have selected <span>{selected}</span> seats for the total price of <span id="total">${totalPrice}</span>
                    </p>
                </Grid>
            </Grid>
        </Grid>
    )
}