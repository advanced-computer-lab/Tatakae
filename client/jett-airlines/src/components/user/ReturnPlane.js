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
    Paper,
    Button,
    Divider,
} from "@mui/material";
import Seat from "./Seat";
import "../../css/Plane.css";
import { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FlightCard from "./FlightCard";
import PaidIcon from "@mui/icons-material/Paid";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DiamondIcon from '@mui/icons-material/Diamond';
import AirlineSeatFlatAngledTwoToneIcon from "@mui/icons-material/AirlineSeatFlatAngledTwoTone";
import seatsBackground from '../../assets/seatsBackground.png';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const colors = {
    availableColor: "#b4b4b4",
    selectedChildColor: "#f25aad",
    selectedColor: "#0071bc",
    occupiedColor: "#494848",
};

const styles = {
    background: {
        position: 'absolute',
        height: '1000',
        width: '100v',
        justifyContent: 'center',
        backgroundImage: `url(${seatsBackground})`,
        backgroundRepeat: 'no-repeat'
    }
};

export default function ReturnPlane(props) {
    const { id } = useParams();

    const [totalPrice, setTotalPrice] = React.useState(0);
    const [childSelected, setChildSelected] = React.useState(false);
    const [businessSelected, setBusinessSelected] = React.useState([]);
    const [firstSelected, setFirstSelected] = React.useState([]);
    const [economySelected, setEconomySelected] = React.useState([]);
    const [flight, setFlight] = React.useState({});
    const [notFound, setNotFound] = React.useState(false);
    const [confirmPop, setConfirmPop] = React.useState(false);
    const [toHome, setToHome] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [toReservations, setToReservations] = React.useState(false);

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

    const handleOpen = () => {
        setConfirmPop(true);
    }

    const redirectReservations = () => {
        setToReservations(true);
    }

    const handleConfirm = async () => {
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

        const dataBooks = {
            token: sessionStorage.getItem('token'),
            economySeatsAdults: economySeatsAdults,
            businessSeatsAdults: businessSeatsAdults,
            firstSeatsAdults: firstSeatsAdults,
            economySeatsChildren: economySeatsChildren,
            businessSeatsChildren: businessSeatsChildren,
            firstSeatsChildren: firstSeatsChildren,
            flightId: flight._id
        }

        await axios.patch('http://localhost:8082/api/reservations/bookhalfreservation/', data).then(() => { sessionStorage.removeItem('reservationNumber') })
            .catch(err => console.log(err))
        await axios.patch('http://localhost:8082/api/flights/flightbookseats/', dataBooks).then(() => {
            setConfirmPop(false)
            setOpenSuccess(true)
        })
            .catch(err => console.log(err))
        //await axios call passing data, remove reservationNumber from sessionStorage,then route to home by setting toHome.
    }

    useEffect(() => {
        axios.get(`http://localhost:8082/api/flights/flightget/${id}`).then(res => {
            setFlight(res.data);
        }).catch(err => {
            setNotFound(true)
        })
    }, [])

    return (
        <Grid style={styles.background} container>
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
                    open={openSuccess}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >

                    <Alert severity="success" variant='filled'>
                        <AlertTitle>Success</AlertTitle>
                        Your reservation is Complete. Have a safe flight!
                        <Button onClick={redirectReservations} color="inherit" size="small" variant="filled">
                            Check it Out!
                        </Button>
                    </Alert>

                </Dialog>

                {notFound && <Navigate to='/wrongURL' />}
                {(toHome || toReservations) && <Navigate to='/home' />}

                <Grid class="plane-container">
                    <Paper sx={{ borderRadius: "20px" }} elevation={5}>
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
                                <small> Adult Selected</small>
                            </ListItem>
                            <ListItem>
                                <Grid
                                    class="seat occupied"
                                    style={{ background: colors.selectedChildColor }}
                                ></Grid>
                                <small>Child Selected</small>
                            </ListItem>
                            <ListItem>
                                <Grid
                                    class="seat occupied"
                                    style={{ background: colors.occupiedColor }}
                                ></Grid>
                                <small>Occupied</small>
                            </ListItem>
                        </List>
                    </Paper>

                    <Grid class="container">
                        <Paper
                            elevation={10}
                            style={{
                                width: "400px",
                                borderRadius: "200px 200px 0px 0px",
                                paddingBottom: "30px",
                            }}
                        >
                            <div
                                style={{
                                    width: "300px",
                                    height: "150px",
                                    borderTopLeftRadius: "10px",
                                    alignContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    margin: "auto"
                                }}
                            >
                                <FormControl onChange={handleRadio} sx={{ marginTop: "80px" }} component="fieldset">
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
                            </div>
                            <List fullWidth>
                                <Divider />
                            </List>
                            <Grid
                                fullwidth
                                alignContent="center"
                                sx={{ textAlign: "center", padding: "10px 10px 10px  10px" }}
                            >
                                <Button
                                    color="secondary"
                                    startIcon={<DiamondIcon />}
                                    variant="contained"
                                >
                                    First Class
                                </Button>
                            </Grid>
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
                                                String.fromCharCode(code + seatNumber) + (1 + rowNumber)
                                            }
                                            //selectedCount={selectedCount}
                                            //setSelectedCount={setSelectedCount}
                                            selected={firstSelected}
                                            setSelected={setFirstSelected}
                                        />
                                    ))}
                                </Grid>
                            ))}
                            <List fullWidth>
                                <Divider />
                            </List>
                            <Grid
                                fullwidth
                                alignContent="center"
                                sx={{ textAlign: "center", padding: "10px 10px 10px  10px" }}
                            >
                                <Button
                                    //color="primary"
                                    startIcon={<BusinessCenterIcon />}
                                    variant="contained"
                                    style={{ background: "#ffbf00" }}
                                >
                                    Business Class
                                </Button>
                            </Grid>
                            {splitArray([].concat(flight.businessSeats)).map(
                                (row, rowNumber) => (
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
                                                    String.fromCharCode(code + seatNumber) +
                                                    (1 +
                                                        rowNumber +
                                                        splitArray([].concat(flight.firstSeats)).length)
                                                }
                                                //selectedCount={selectedCount}
                                                //setSelectedCount={setSelectedCount}
                                                selected={businessSelected}
                                                setSelected={setBusinessSelected}
                                            />
                                        ))}
                                    </Grid>
                                )
                            )}
                            <List fullWidth>
                                <Divider />
                            </List>
                            <Grid
                                fullwidth
                                alignContent="center"
                                sx={{ textAlign: "center", padding: "10px 10px 10px  10px" }}
                            >
                                <Button
                                    color="success"
                                    startIcon={<PaidIcon />}
                                    variant="contained"
                                    style={{ backgroundColor: "#00a698" }}
                                >
                                    Economy Class
                                </Button>
                            </Grid>
                            {splitArray([].concat(flight.economySeats)).map(
                                (row, rowNumber) => (
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
                                )
                            )}
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
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={handleOpen}
                            disabled={(businessSelected.length + economySelected.length + firstSelected.length)===0}>
                            Reserve Seat(s)
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
