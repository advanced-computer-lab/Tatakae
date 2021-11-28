import { Grid, Box} from '@mui/material';

export default function Seat(props) {

    let seatColor;
    if(props.available){
        switch(props.type){
            case "b": seatColor = { backgroundColor: "blue" };break;
            case "f": seatColor = { backgroundColor: "purple" };break;
            case "e": seatColor = { backgroundColor: "black" };break;
            default: seatColor = { backgroundColor: "green" };
        }
    }
    else
        seatColor = { backgroundColor: "grey" }

    return (
        <Box style={seatColor} sx={{textAlign: "center", borderRadius: "1em 1em 0em 0em", width: "3em",height: "3em"}}>
            {props.seatNumber}
        </Box>
    )
}