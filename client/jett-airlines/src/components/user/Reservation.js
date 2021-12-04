import { React, useEffect, useState, forwardRef } from 'react'
import FlightDetails from './FlightDetails';
import FlightCard from './FlightCard';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Reservation(props) {
    const [deptFlight, setDeptFlight] = useState(null);
    const [returnFlight, setReturnFlight] = useState(null);
    const [returnFlights, setReturnFlights] = useState([]);
    const [returnFlightsPop, setReturnFlightsPop] = useState(false);
    const [noReturns, setNoReturns] = useState(false);
    const [returnPop, setReturnPop] = useState(false);
    const [cancelPop, setCancelPop] = useState(false);

    useEffect(() => {
        if (props.reservation.departureFlight) {
            axios.get(`http://localhost:8082/api/flights/flightget/${props.reservation.departureFlight}`)
                .then((res) => setDeptFlight(res.data)).catch((err) => console.log(err))
        }

        if (props.reservation.returnFlight) {
            axios.get(`http://localhost:8082/api/flights/flightget/${props.reservation.returnFlight}`)
                .then((res) => setReturnFlight(res.data)).catch((err) => console.log(err))
        }
    }, [])

    const handleonClick = () => {


    }

    const handleCancelClick = () => {
        setCancelPop(true);
    }

    const handleYesCancel = () => {
        axios.delete(`http://localhost:8082/api/reservations/deletefullreservation/${props.reservation._id}`, { data: { token: sessionStorage.getItem('token') } })
            .then(() => {
                setCancelPop(false);
                props.setRefresh(!props.refresh)
            })
    }

    const handleNoCancel = () => {
        setCancelPop(false);
    }

    return (
        <Grid>
            {deptFlight && (<FlightCard flight={deptFlight} />)}
            {returnFlight && (<FlightCard flight={returnFlight} />)}
            <Button onClick={handleCancelClick}>Cancel reservation</Button>

            <Dialog
                open={cancelPop}
                TransitionComponent={Transition}
                onClose={handleNoCancel}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to cancel this reservation?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleYesCancel} size="small" color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleNoCancel}>
                        No
                    </Button>
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


    )
}
