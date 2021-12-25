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
    Typography,
} from "@mui/material";
import Seat from "./Seat";
import Alert from '@mui/material/Alert';
import "../../css/Plane.css";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PaidIcon from "@mui/icons-material/Paid";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import DiamondIcon from '@mui/icons-material/Diamond';
import seatsBackground from '../../assets/seatsBackground.png';
import TicketDetails from "./TicketDetails";
import AlertTitle from '@mui/material/AlertTitle';
import { RingLoader } from 'react-spinners'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const colors = {
    availableColor: "#b4b4b4",
    selectedChildColor: "#f25aad",
    selectedColor: "#0071bc",
    occupiedColor: "#494848",
};

export default function EditSeats() {
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem('signedUser'));
    const seatsData = JSON.parse(sessionStorage.getItem('seatsData'));
    const Ticket = JSON.parse(sessionStorage.getItem('Ticket'));


    const [totalPrice, setTotalPrice] = React.useState(0);
    const [childSelected, setChildSelected] = React.useState(false);
    const [flight, setFlight] = React.useState({});
    const [notFound, setNotFound] = React.useState(false);
    const [confirmPop, setConfirmPop] = React.useState(false);
    const [toHome, setToHome] = React.useState(false);
    const [loadingPop, setLoadingPop] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFailure, setOpenFailure] = React.useState(false);



    const [businessSelected, setBusinessSelected] = React.useState([]);
    const [firstSelected, setFirstSelected] = React.useState([]);
    const [economySelected, setEconomySelected] = React.useState([]);
    const [prevBusiness, setPreviousBusiness] = React.useState([]);
    const [prevFirst, setPreviousFirst] = React.useState([]);
    const [prevEconomy, setPreviousEconomy] = React.useState([]);

    const authChannelRef = React.useRef(new BroadcastChannel("auth"));
    const authChannel = authChannelRef.current;

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

    const test = () => {

    }

    const handleNo = () => {
        setConfirmPop(false);
    }

    const handleToHome = () => {
        setToHome(true)
    }

    const handleCloseFailure = () => {
        setOpenFailure(false)
    }

    const handleOpen = () => {
        if (Ticket.departureTicket) {
            axios.patch(
                'http://localhost:8082/api/reservations/cancelhalfreservation/',
                { data: { token: sessionStorage.getItem("token"), departureTicket: Ticket.departureTicket } }
            )
                .then(() => {
                    axios.patch(
                        'http://localhost:8082/api/reservations/bookhalfreservation/',
                        { data: { token: sessionStorage.getItem("token"), departureTicket: Ticket.departureTicket } }
                    )
                });
        }

        else {
            axios.patch(
                'http://localhost:8082/api/reservations/cancelhalfreservation/',
                { data: { token: sessionStorage.getItem("token"), returnTicket: Ticket.returnTicket } }
            )
                .then(() => {


                });
        }

    }

    const handleToPayment = async () => {

        const economySeatsAdults = economySelected.filter(e => e.isChild === false).map(e => e.seatIndex)
        const businessSeatsAdults = businessSelected.filter(e => e.isChild === false).map(e => e.seatIndex)
        const firstSeatsAdults = firstSelected.filter(e => e.isChild === false).map(e => e.seatIndex)

        const economySeatsChildren = economySelected.filter(e => e.isChild === true).map(e => e.seatIndex)
        const businessSeatsChildren = businessSelected.filter(e => e.isChild === true).map(e => e.seatIndex)
        const firstSeatsChildren = firstSelected.filter(e => e.isChild === true).map(e => e.seatIndex)

        const newTicket = {
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

        sessionStorage.setItem('newTicket', JSON.stringify(newTicket))

        axios.post('http://localhost:8082/api/reservations/payment', { totalPrice: totalPrice }).then(res => {
            setOpenFailure(false)
            setLoadingPop(true)
            window.open(res.data, '_blank');
        })
    }

    const handleYesConfirm = () => {
        setConfirmPop(false);
    }

    const checkPrev = () => {
        return JSON.stringify(economySelected.sort((a, b) => a.seatIndex < b.seatIndex)) === JSON.stringify(prevEconomy.sort((a, b) => a.seatIndex < b.seatIndex))
            && JSON.stringify(firstSelected.sort((a, b) => a.seatIndex < b.seatIndex)) === JSON.stringify(prevFirst.sort((a, b) => a.seatIndex < b.seatIndex))
            && JSON.stringify(businessSelected.sort((a, b) => a.seatIndex < b.seatIndex)) === JSON.stringify(prevBusiness.sort((a, b) => a.seatIndex < b.seatIndex))
    }

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

    const clearStorageToHome = () => {
        sessionStorage.removeItem('newTicket')
        sessionStorage.removeItem('Ticket')
        sessionStorage.removeItem('returnData')
        sessionStorage.removeItem('returnDataBooks')
        setToHome(true)
    }

    useEffect(() => {
        axios.get(`http://localhost:8082/api/flights/flightget/${id}`).then((res) => {
            setFlight(res.data)
        })

    }, []);



    useEffect(() => {
        authChannel.onmessage = (e) => {
            if (e.data.success) {
                setLoadingPop(false)
                setOpenSuccess(true)
            }
            else {
                setLoadingPop(false)
                setOpenFailure(true)
            }
        };
    }, []);

    const failureButtons = (<>
        <Button onClick={handleToPayment} color="inherit" size="small" >
            Try Again
        </Button>
        <Button href='/home' color="inherit" size="small" >
            Back to Home
        </Button></>)

    return (

        <Grid style={styles.background} container>

            <Grid>

                <Dialog
                    open={openFailure}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseFailure}
                    aria-describedby="alert-dialog-slide-description"
                >

                    <Alert severity="error" variant="filled"
                        action={failureButtons}
                    >
                        Your transaction failed!.
                    </Alert>

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
                        <Button onClick={clearStorageToHome} color="inherit" size="small" variant="filled">
                            Check it Out!
                        </Button>
                    </Alert>

                </Dialog>

                <Dialog
                    open={loadingPop}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Processing your payment...</DialogTitle>
                    <DialogContent sx={{ width: 120, height: 120, ml: 8 }}>
                        <RingLoader size='90' color='#0000ff' />
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={confirmPop}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`Want to add Flight #${flight.flightNumber} to your reservation?`}</DialogTitle>
                    <DialogContent style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '0', overflowX: "hidden" }}>
                        <TicketDetails flight={flight} firstSelected={firstSelected} businessSelected={businessSelected} economySelected={economySelected} totalPrice={totalPrice} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToPayment} size="small" color="primary">
                            Yes
                        </Button>
                        <Button onClick={handleNo}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>

                {notFound && <Navigate to='/wrongURL' />}
                {toHome && <Navigate to='/TicketBoard' />}

                <Grid class="plane-container">
                    <Paper sx={{ borderRadius: "20px" }} elevation={5}>
                        <List class="showcase">
                            <ListItem>
                                <Grid
                                    class="seat"
                                    style={{ background: colors.availableColor }}
                                ></Grid>
                                <Typography>
                                    <small>Available</small>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid
                                    class="seat selected"
                                    style={{ background: colors.selectedColor }}
                                ></Grid>
                                <Typography>
                                    <small> Adult Selected</small>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid
                                    class="seat occupied"
                                    style={{ background: colors.selectedChildColor }}
                                ></Grid>
                                <Typography>
                                    <small>Child Selected</small>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid
                                    class="seat occupied"
                                    style={{ background: colors.occupiedColor }}
                                ></Grid>
                                <Typography>
                                    <small>Occupied</small>
                                </Typography>
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
                            <List fullwidth>
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
                            {flight?.firstPrice &&
                                splitArray([].concat(flight.firstSeats)).map((row, rowNumber) => (
                                    <Grid key={rowNumber} class="row">
                                        {row.map((element, seatNumber) => (console.log(flight.firstPrice),
                                            <Seat
                                                id={id}
                                                key={seatNumber + 8 * rowNumber}
                                                seatIndex={seatNumber + 8 * rowNumber}
                                                previous={prevFirst}
                                                setPrevious={setPreviousFirst}
                                                isChild={childSelected}
                                                price={flight.firstPrice}
                                                totalPrice={totalPrice}
                                                setTotalPrice={setTotalPrice}
                                                available={seatsData.firstSeatsAdults.includes((seatNumber + 8 * rowNumber)) ? false : seatsData.firstSeatsChildren.includes((seatNumber + 8 * rowNumber)) ? false : element}
                                                colors={colors}
                                                seatNumber={
                                                    String.fromCharCode(code + seatNumber) + (1 + rowNumber)
                                                }
                                                //selectedCount={selectedCount}
                                                //setSelectedCount={setSelectedCount}
                                                selected={firstSelected}
                                                setSelected={setFirstSelected}
                                                pressed={seatsData.firstSeatsAdults.includes((seatNumber + 8 * rowNumber)) ? 1 : seatsData.firstSeatsChildren.includes((seatNumber + 8 * rowNumber)) ? 2 : 0}
                                            />
                                        ))}
                                    </Grid>
                                ))}
                            <List fullwidth>
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
                            {flight?.businessPrice &&
                                splitArray([].concat(flight.businessSeats)).map(
                                    (row, rowNumber) => (
                                        <Grid key={rowNumber} class="row">
                                            {row.map((element, seatNumber) => (
                                                <Seat
                                                    id={id}
                                                    key={seatNumber + 8 * rowNumber}
                                                    seatIndex={seatNumber + 8 * rowNumber}
                                                    previous={prevBusiness}
                                                    setPrevious={setPreviousBusiness}
                                                    isChild={childSelected}
                                                    price={flight.businessPrice}
                                                    totalPrice={totalPrice ? totalPrice : 0}
                                                    setTotalPrice={setTotalPrice}
                                                    available={seatsData.businessSeatsAdults.includes((seatNumber + 8 * rowNumber)) ? false : seatsData.businessSeatsChildren.includes((seatNumber + 8 * rowNumber)) ? false : element}
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
                                                    pressed={seatsData.businessSeatsAdults.includes((seatNumber + 8 * rowNumber)) ? 1 : seatsData.businessSeatsChildren.includes((seatNumber + 8 * rowNumber)) ? 2 : 0}
                                                />
                                            ))}
                                        </Grid>
                                    )
                                )}
                            <List fullwidth>
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
                            {flight?.economyPrice &&
                                splitArray([].concat(flight.economySeats)).map(
                                    (row, rowNumber) => (
                                        <Grid key={rowNumber} class="row">
                                            {row.map((element, seatNumber) => (
                                                <Seat
                                                    id={id}
                                                    key={seatNumber + 8 * rowNumber}
                                                    seatIndex={seatNumber + 8 * rowNumber}
                                                    previous={prevEconomy}
                                                    setPrevious={setPreviousEconomy}
                                                    isChild={childSelected}
                                                    price={flight.economyPrice}
                                                    totalPrice={totalPrice ? totalPrice : 0}
                                                    setTotalPrice={setTotalPrice}
                                                    available={seatsData.economySeatsAdults.includes((seatNumber + 8 * rowNumber)) ? false : seatsData.economySeatsChildren.includes((seatNumber + 8 * rowNumber)) ? false : element}
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
                                                    pressed={seatsData.economySeatsAdults.includes((seatNumber + 8 * rowNumber)) ? 1 : seatsData.economySeatsChildren.includes((seatNumber + 8 * rowNumber)) ? 2 : 0}
                                                />
                                            ))}
                                        </Grid>
                                    )
                                )}
                        </Paper>
                        <Typography>
                            <p class="text">
                                You have selected{" "}
                                <span>
                                    {businessSelected.length +
                                        firstSelected.length +
                                        economySelected.length}
                                </span>{" "}
                                seats for the total price of <span id="total">${totalPrice}</span>
                            </p>
                        </Typography>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={handleOpen}
                            disabled={((businessSelected.length + economySelected.length + firstSelected.length) === 0) || checkPrev() === true}>
                            Edit Seat(s)
                        </Button>
                        <Button variant="contained" href='/home' sx={{ mt: 3, ml: 1 }}>Back to Home</Button>
                    </Grid>
                </Grid>
                {notFound && <Navigate to="/randomURL" />}
            </Grid>
        </Grid>

    );
}
