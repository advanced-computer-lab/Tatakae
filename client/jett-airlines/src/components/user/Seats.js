import { Grid, Box} from '@mui/material';
import { style, width } from '../../../../../../../../../../../mnt/DATA/Documents/Workspaces/vscode-workspace/Tatakae/client/jett-airlines/node_modules/@mui/system';

let economySeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false)]

let businessSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true)]

let firstSeats = [Boolean(true), Boolean(false), Boolean(true), Boolean(true), Boolean(false)]

const styles = {
    bSeatStyle: {
        backgroundColor: "blue",
        width: "6em"
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

export default function Seats(props) {

    return (
        <Grid container columns="2" wrap="wrap" >
            {businessSeats.map( available => {
                if(available)
                    return (<Box style={styles.bSeatStyle}>
                        num
                    </Box>)
                 return (<Box style={styles.oSeatStyle}>
                    num
                </Box>)
            })}

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


        </Grid>
    )
}