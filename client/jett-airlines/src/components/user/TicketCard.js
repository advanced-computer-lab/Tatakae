import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import qrcode from "../../assets/qrcode.png";
import bg from '../../assets/travelwallpaper-1.png'
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


    const styles = {
        background: {
          position: 'absolute',
          padding: 'auto',
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${bg})`
        },
        textStyle: {
            fontWeight: "700",fontSize: '0.9em',color:"#0071bc"
          },}



    return (
        <div style={styles.background}>
        <Grid style={{ alignitems: "right", margin: "5vh 0 0 37vw", backgroundColor: "#ffffff", height: "400px", width: "350px" }} container>
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
                <Typography style ={styles.textStyle}>USA</Typography>
            </Grid>
            <Grid item style={{ fontSize: "3em" }} xs={3}>
                <FlightIcon style={{ color:"d3e6f4",margin:"-2vh 0 0 0",transform: "scale(1.2)  rotate(90deg)" }} />
            </Grid>
            <Grid item style={{ fontSize: "3em" }} xs>
            <Typography style ={styles.textStyle}>EGY</Typography>
            </Grid>
            
            
            <List
        sx={{
          width: "100%",
          paddingTop: "0",
          paddingBottom: "0",
          margin:'3vh 0 0 0 '
        }}  
      >
        
        <ListItem fullWidth>
          <Grid container style={{}}>
            <Grid container item xs={3}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                  fontSize= '0.65em'
                  color='#c6c6c9'
                >
                  FLIGHT
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.9em'}}>819</Typography></Grid>
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid item align="left" xs={12}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                    fontSize= '0.65em'
                    color='#c6c6c9'
                  >
                    TERMINAL
                  </Typography>
                </Grid>
                <Grid> <Typography style={{fontSize: '0.9em'}}>2</Typography></Grid>
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
                    fontSize= '0.65em'
                    color='#c6c6c9'
                  >
                    SEAT
                  </Typography>
                </Grid>
                <Grid> <Typography style={{fontSize: '0.9em'}}>C2</Typography></Grid>
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
                  fontSize= '0.65em'
                  color='#c6c6c9'
                >
                  PASSENGER
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.9em'}}>Mostafa Sharaf</Typography></Grid>
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
                  fontSize= '0.65em'
                  color='#c6c6c9'
                >
                  CLASS
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.9em'}}>FIRST</Typography></Grid>
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
                  fontSize= '0.65em'
                  color='#c6c6c9'
                >
                  CLASS
                </Typography>
              </Grid>
              <Grid> <Typography style={{fontSize: '0.9em'}}>FIRST</Typography></Grid>
            </Grid>
            </Grid>
            
        </ListItem>
      </List> 
      <Grid item xs>
                <img src={qrcode} alt='' style={{height: '200px',margin:"-22vh 0 0 10vw"
      }} /></Grid>
      </Grid>
        </Grid>
        </div>
    )
}
