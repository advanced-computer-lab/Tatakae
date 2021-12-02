import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    Card,
    CardMedia,
    CardActionArea,
    Typography,
    Paper,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    BeachAccessIcon,
    ListItemText,
    Tab,
    Tabs,
} from "@mui/material";

export default function TicketCard(props) {






    return (
        <Grid style={{ alignitems: "right", margin: "5vh 0 0 37vw", backgroundColor: "#ff3c41", height: "400px", width: "350px" }} container>
            <Grid
                align="center"
                style={{
                    margin:"5vh 0 0 0 ",
                    width: "450px",
                    height: "120px",
                    alignItems: "center",
                    padding:"0"
                }}
                item
                fullWidth
                container
            >
            <Grid item style={{ fontSize: "3em" }} xs>
                <Typography style ={{fontWeight: 'bold',fontSize: '0.9em',}}>USA</Typography>
            </Grid>
            <Grid item style={{ fontSize: "3em" }} xs={3}>
                <FlightIcon style={{ margin:"-2vh 0 0 0",transform: "scale(1.5)  rotate(90deg)" }} />
            </Grid>
            <Grid item style={{ fontSize: "3em" }} xs>
            <Typography style ={{fontWeight: 'bold',fontSize: '0.9em',}}>EGY</Typography>
            </Grid>
            
            
            <List
        sx={{
          width: "100%",
          paddingTop: "0",
          paddingBottom: "0",
        }}  
      >
        <Divider style ={{margin:"5vh 0 0 0 "}}/>
        <ListItem fullWidth>
          <Grid container style={{}}>
            <Grid container item xs={3}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  FLIGHT
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.8em'}}>819</Typography></Grid>
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid item align="left" xs={12}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    TERMINAL
                  </Typography>
                </Grid>
                <Grid> <Typography style={{fontSize: '0.8em'}}>2</Typography></Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid item align="left" xs={12}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    SEAT
                  </Typography>
                </Grid>
                <Grid> <Typography style={{fontSize: '0.8em'}}>C2</Typography></Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
        <Grid container>
        <Grid container item xs={4}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  PASSENGER
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.8em'}}>Mostafa Sharaf</Typography></Grid>
            </Grid>
            </Grid>
        </ListItem>
        <ListItem>
        <Grid container>
        <Grid container item xs={4}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  CLASS
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.8em'}}>FIRST</Typography></Grid>
            </Grid>
            </Grid>
        </ListItem>
        <ListItem>
        <Grid container>
        <Grid container item xs={4}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  CLASS
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.8em'}}>FIRST</Typography></Grid>
            </Grid>
            </Grid>
        </ListItem>
      </List> 
      </Grid>
        </Grid>
    )
}
