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
import TicketDetails from "./TicketDetails";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
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
  const [returnFlights, setReturnFlights] = React.useState([]);
  const [returnFlightsPop, setReturnFlightsPop] = React.useState(false);
  const [noReturns, setNoReturns] = React.useState(false);
  const [searchPop, setSearchPop] = React.useState(false);
  const [loadingPop, setLoadingPop] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

  const [filteredFlights, setFilteredFlights] = React.useState([]);
  const [deptDateQuery, setDeptDateQuery] = React.useState(null);
  const [arrDateQuery, setArrDateQuery] = React.useState(null);
  const [deptTerminalQuery, setDeptTerminalQuery] = React.useState('');
  const [arrTerminalQuery, setArrTerminalQuery] = React.useState('');
  const [passengerQuery, setPassengerQuery] = React.useState('');
  const [cabinQuery, setCabinQuery] = React.useState('');

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
    setConfirmPop(true);
  }

  const handleOpenSearch = () => {
    setSearchPop(true)
  }

  const filtering = () => {
    let x = returnFlights

    if (deptTerminalQuery) {
      x = x.filter(flight => flight.departureTerminal === deptTerminalQuery)
    }
    if (arrTerminalQuery) {
      x = x.filter(flight => flight.arrivalTerminal === arrTerminalQuery)
    }
    if (cabinQuery) {
      switch (cabinQuery) {
        case 'Economy': x = x.filter(flight => flight.availableEconomySeats > 0); break;
        case 'Business': x = x.filter(flight => Number(flight.availableBusinessSeats) > 0); break;
        case 'First': x = x.filter(flight => flight.availableFirstSeats > 0); break;
        default: break;
      }
    }
    if (passengerQuery) {
      x = x.filter(flight => flight.availableTotalSeats >= passengerQuery)
    }
    if (deptDateQuery) {
      x = x.filter(flight => new Date(flight.departureDate).setSeconds(0, 0) === new Date(deptDateQuery).setSeconds(0, 0))
    }
    if (arrDateQuery) {
      x = x.filter(flight => new Date(flight.arrivalDate).setSeconds(0, 0) === new Date(arrDateQuery).setSeconds(0, 0))
    }
    setFilteredFlights(x)
  }

  const handleSearch = () => {
    filtering();
    setSearchPop(false);
  }

  const handleChangeCabin = (event) => {
    setCabinQuery(event.target.value);
  }

  const handleChangePassenger = (event) => {
    setPassengerQuery((event.target.value) || '');
  };

  const handleChangeDeptTerminal = (event) => {
    setDeptTerminalQuery(event.target.value || '');
  }

  const handleChangeArrTerminal = (event) => {
    setArrTerminalQuery(event.target.value || '');
  }

  const handleChangeDeptDate = (event) => {
    setDeptDateQuery(new Date(event))
  }

  const handleChangeArrDate = (event) => {
    setArrDateQuery(new Date(event))
  }

  const handleYesReturn = async () => {
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

    const data = {
      token: sessionStorage.getItem('token'),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departureTicket: deptTicket,
      departureFlight: flight._id,
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

    sessionStorage.setItem('deptData', JSON.stringify(data))
    sessionStorage.setItem('deptDataBooks', JSON.stringify(dataBooks))

    setReturnPop(false);

    const returnData = {
      token: sessionStorage.getItem('token'),
      departureTicket: flight
    }

    await axios.post('http://localhost:8082/api/flights/getdeparture0retrun', returnData).then(res => {
      if (res.data.length !== 0) {
        setReturnFlights(res.data)
        setFilteredFlights(res.data)
        setReturnFlightsPop(true)
      }
      else {
        setNoReturns(true)
      }
    })
      .catch(err => console.log(err))
  }

  const handleToPayment = async () => {

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

    const data = {
      token: sessionStorage.getItem('token'),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departureTicket: deptTicket,
      departureFlight: flight._id,
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

    sessionStorage.setItem('deptData', JSON.stringify(data))
    sessionStorage.setItem('deptDataBooks', JSON.stringify(dataBooks))

    axios.post('http://localhost:8082/api/reservations/payment', { totalPrice: totalPrice }).then(res => {
      setReturnPop(false)
      setNoReturns(false)
      setOpenFailure(false)
      setLoadingPop(true)
      window.open(res.data, '_blank');
    })

    /* await axios.post('http://localhost:8082/api/reservations/reservationcreate/', data)
       .catch(err => console.log(err))
     await axios.patch('http://localhost:8082/api/flights/flightbookseats/', dataBooks)
       .catch(err => console.log(err))*/

    //setToHome(true);
  }

  const handleYesConfirm = () => {
    setConfirmPop(false);
    setReturnPop(true);
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
    sessionStorage.removeItem('deptData')
    sessionStorage.removeItem('deptDataBooks')
    sessionStorage.removeItem('returnData')
    sessionStorage.removeItem('returnDataBooks')
    setToHome(true)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/flights/flightget/${id}`)
      .then((res) => {
        setFlight(res.data);
      })
      .catch((err) => {
        setNotFound(true);
      });
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

  const passengerSeatsSearch = (
    <FormControl sx={{ m: 1, width: 120 }}>
      <InputLabel>No. of Seats</InputLabel>
      <OutlinedInput
        name='flightNumber'
        id="flightNumberfield"
        value={passengerQuery}
        type="text"
        onChange={handleChangePassenger}
      />
    </FormControl>)

  const cabinClassSearch = (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-dialog-select-label">Cabin Class</InputLabel>
      <Select
        labelId="demo-dialog-select-label"
        id="demo-dialog-select"
        value={cabinQuery}
        defaultValue=''
        onChange={handleChangeCabin}
        input={<OutlinedInput label="Cabin Class" />}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value='Economy'>Economy</MenuItem>
        <MenuItem value='Business'>Business</MenuItem>
        <MenuItem value='First'>First</MenuItem>
      </Select>
    </FormControl>)

  const deptTerminalSearch = (<FormControl sx={{ m: 1, minWidth: 90 }}>
    <InputLabel id="demo-dialog-select-label">Dept Terminal</InputLabel>
    <Select
      labelId="demo-dialog-select-label"
      id="demo-dialog-select"
      value={deptTerminalQuery}
      defaultValue=''
      onChange={handleChangeDeptTerminal}
      input={<OutlinedInput label="Terminal No." />}
    >
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      {returnFlights.map(item => item.departureTerminal)
        .filter((value, index, self) => self.indexOf(value) === index).map(terminal => (
          <MenuItem key={terminal} value={terminal}>{terminal}</MenuItem>
        ))}
    </Select>
  </FormControl>)

  const arrTerminalSearch = (<FormControl sx={{ m: 1, minWidth: 90 }}>
    <InputLabel id="demo-dialog-select-label">Arr Terminal</InputLabel>
    <Select
      labelId="demo-dialog-select-label"
      id="demo-dialog-select"
      value={arrTerminalQuery}
      defaultValue=''
      onChange={handleChangeArrTerminal}
      input={<OutlinedInput label="Terminal No." />}
    >
      <MenuItem value=''>
        <em>None</em>
      </MenuItem>
      {returnFlights.map(item => item.arrivalTerminal)
        .filter((value, index, self) => self.indexOf(value) === index).map(terminal => (
          <MenuItem key={terminal} value={terminal}>{terminal}</MenuItem>
        ))}
    </Select>
  </FormControl>)

  const deptDateSearch = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid sx={{ m: 1, Width: 90 }}>
        <DateTimePicker
          label="Departure Date"
          value={deptDateQuery}
          onChange={handleChangeDeptDate}

          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>
  )

  const arrDateSearch = (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid sx={{ m: 1, Width: 90 }}>
        <DateTimePicker
          label="Arrival Date"
          value={arrDateQuery}
          onChange={handleChangeArrDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </LocalizationProvider>
  )

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
            <Button onClick={handleYesConfirm} size="small" color="primary">
              Yes
            </Button>
            <Button onClick={handleNo}>
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
            action={<>
              <Button onClick={handleToPayment} color="inherit" size="small" variant="outlined">
                Pay for Dept. Flight
              </Button>
              <Button href='/home' color="inherit" size="small" variant="outlined">
                Back to Home
              </Button>
            </>
            }
          >
            Sorry this flight has no returns.
          </Alert>
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
            <Button onClick={handleToPayment}>
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
          <DialogContent style={{ alignItems: "center", minWidth: "350px", minHeight: "400" }}>
            {filteredFlights.map(f => <FlightCard key={f._id} flight={f} return={true} />)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpenSearch} size="small" color="primary">
              Search
            </Button>
          </DialogActions>
          <Dialog
            open={searchPop}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Search from the following criteria"}</DialogTitle>
            <DialogContent style={{ paddingLeft: '0', paddingRight: '0', paddingTop: '0', overflowX: "hidden" }}>
              {passengerSeatsSearch}
              {cabinClassSearch}
              {deptTerminalSearch}
              {arrTerminalSearch}
              {deptDateSearch}
              {arrDateSearch}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSearch} size="small" color="primary">
                Search
              </Button>
            </DialogActions>
          </Dialog>
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
                      pressed={0}
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
                        pressed={0}
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
                        pressed={0}
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
              disabled={(businessSelected.length + economySelected.length + firstSelected.length) === 0}>
              Reserve Seat(s)
            </Button>
            <Button variant="contained" href='/home' sx={{ mt: 3, ml: 1 }}>Back to Home</Button>
          </Grid>
        </Grid>
        {notFound && <Navigate to="/randomURL" />}
      </Grid>
    </Grid>
  );
}
