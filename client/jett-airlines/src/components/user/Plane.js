import { Grid, Box} from '@mui/material';
import Seat from './Seat'

let economySeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false)]

let businessSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true)]

let firstSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false)]

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

    return (
        <Grid container columns="2" wrap="wrap" >
            {businessSeats.map( (available, seatNumber) => (
                <Seat available={available} type="b" seatNumber={seatNumber}/>
            ))}

            {firstSeats.map( (available, seatNumber) => (
                <Seat available={available} type="f" seatNumber={seatNumber}/>
            ))}
            {economySeats.map( (available, seatNumber) => (
                <Seat available={available} type="e" seatNumber={seatNumber}/>
            ))}
        </Grid>
    )
}

/*

{firstSeats.map( available => {
                if(available)
                    return (<Box style={styles.fSeatStyle}>
                        num
                    </Box>)
                 return (<Box style={styles.oSeatStyle}>
                    num
                </Box>)
            })}

            {economySeats.map( available => {
                if(available)
                    return (<Box style={styles.eSeatStyle}>
                        num
                    </Box>)
                 return (<Box style={styles.oSeatStyle}>
                    num
                </Box>)
            })}

*/