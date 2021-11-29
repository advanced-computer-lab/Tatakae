import { Grid, Box} from '@mui/material';
import Seat from './Seat'

let economySeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false), Boolean(true)]

let businessSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(true), Boolean(true)]

let firstSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false), Boolean(false)]

let seatWidth = 3;

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
    oSeatStyle:{
        backgroundColor: "grey"
    }
}

export default function Plane(props) {

    const getWidth = (seatNumber) => {
        if(seatNumber === 2)
            return 3;
        return 1;
    }

    return (
        <Grid container columns="8" wrap="wrap" sx={{maxWidth: "50%"}}>
            {businessSeats.map( (available, seatNumber) => (
                <Grid item xs={getWidth(seatNumber)}>
                <Seat available={available} type="b" seatNumber={seatNumber}/>
                </Grid>
            ))}
            {firstSeats.map( (available, seatNumber) => (
                <Grid item xs={getWidth(seatNumber)}>
                <Seat available={available} type="b" seatNumber={seatNumber}/>
                </Grid>
            ))}
            {economySeats.map( (available, seatNumber) => (
                <Grid item xs={getWidth(seatNumber)}>
                <Seat available={available} type="b" seatNumber={seatNumber}/>
                </Grid>
            ))}
        </Grid>
    )
}