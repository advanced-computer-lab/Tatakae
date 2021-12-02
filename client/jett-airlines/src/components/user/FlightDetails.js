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
import { TabPanel, TabList } from "@mui/lab";
import world from "../../assets/world.png";
import plane from '../../assets/plane.jpg'

export default function FlightDetails(props) {
  const flight = props.flight;
  const diffMs = new Date(flight.arrivalDate) - new Date(flight.departureDate);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  const [tab, setTab] = React.useState("First");
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Grid style={{ height: "600px", width: "450px"}} fullWidth container>
      <Grid
        align="center"
        style={{
          backgroundImage: `url(${plane})`,
          width: "450px",
          height: "170px",
          alignItems: "center",
        }}
        item
        fullWidth
        container
      >
        <Grid item style={{ fontSize: "3em",color: "white"}} xs>
          {flight.from}
        </Grid>
        <Grid style={{ fontSize: "3em" }} item xs={3}>
          <FlightIcon style={{ transform: "scale(1.5)  rotate(90deg)" ,color: "white"}} />
        </Grid>
        <Grid style={{ fontSize: "3em" ,color: "white"}} item xs>
          {flight.to}
        </Grid>
      </Grid>
      <List
        sx={{
          width: "100%",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
        <Divider />
        <ListItem fullWidth>
          <ListItemAvatar>
            <FlightTakeoffIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container>
            <Grid container item xs={3}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  from
                </Typography>
              </Grid>
              <Grid>{flight.from}</Grid>
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
                    Departure Terminal
                  </Typography>
                </Grid>
                <Grid>{flight.departureTerminal}</Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <FlightLandIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container>
            <Grid container item xs={3}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  to
                </Typography>
              </Grid>
              <Grid>{flight.to}</Grid>
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
                    Arrival Terminal
                  </Typography>
                </Grid>
                <Grid>{flight.arrivalTerminal}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <EventIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container>
            <Grid container item xs={6}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  Departure Date
                </Typography>
              </Grid>
              <Grid>{new Date(flight.departureDate).toLocaleString()}</Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item align="left" xs={12}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Arrival Date
                  </Typography>
                </Grid>
                <Grid>{new Date(flight.arrivalDate).toLocaleString()}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <AirlineSeatReclineExtraIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <Tab value="First" label="First" />
            <Tab value="Business" label="Business" />
            <Tab value="Economy" label="Economy" />
          </Tabs>
        </ListItem>
        
        <ListItem>
          <ListItemAvatar>
            <SupervisorAccountIcon style={{ transform: "scale(1.2)" }}/>
          </ListItemAvatar>
          <Grid container>
            <Grid item align="left" xs={12}>
              <Typography
                sx={{ mt: 0.5 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                Available {tab} Class Seats
              </Typography>
            </Grid>
            <Grid>
              {tab==="First"?<p>{flight.availableFirstSeats}</p>:<p>{tab==="Business"?<p>{flight.availableBusinessSeats}</p>:<p>{flight.availableEconomySeats}</p>}</p>}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
        <ListItemAvatar>
          <AttachMoneyIcon style={{ transform: "scale(1.2)" }}/>
        </ListItemAvatar>
        <Grid container>
            <Grid container item xs={6}>
              <Grid item align="left" xs={12}>
                <Typography
                  sx={{ mt: 0.5 }}
                  color="text.secondary"
                  display="block"
                  variant="caption"
                >
                  Adult Seat price
                </Typography>
              </Grid>
              <Grid>{tab==="First"?<p>${flight.firstPrice}</p>:<p>{tab==="Business"?<p>${flight.businessPrice}</p>:<p>${flight.economyPrice}</p>}</p>}</Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item align="left" xs={12}>
                  <Typography
                    sx={{ mt: 0.5 }}
                    color="text.secondary"
                    display="block"
                    variant="caption"
                  >
                    Child Seat price
                  </Typography>
                </Grid>
                <Grid>{tab==="First"?<p>${0.5*flight.firstPrice}</p>:<p>{tab==="Business"?<p>${0.5*flight.businessPrice}</p>:<p>${0.5*flight.economyPrice}</p>}</p>}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
}

/*

       {tab==="Business"?
            <p> {flight.availableBusinessSeats}</p>
            :
            {tab==="First"?<p> {flight.availableFirstSeats}</p>
            :
            <p> {flight.availableEconomySeats}</p>
      }
      }


{tab==="Business"? :{tab==="First"?:}}


<TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabsList>
      <TabPanel value={0}>First content</TabPanel>
      <TabPanel value={1}>Second content</TabPanel>
      <TabPanel value={2}>Third content</TabPanel>
    </TabsUnstyled>


        <Grid container item>
            <Grid item xs={2}>
                <FlightTakeoffIcon />
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
        <Divider />
        <Grid container item>
        <Grid item xs={2}>
                <FlightLandIcon />
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
        <Grid container item>
        </Grid>
        <Grid container item>
        </Grid>
        <Grid container item>
        </Grid>
        <Grid container item>
        </Grid>



style={{ backgroundImage: `url(${world})` }}
                <CardActionArea>
                    <AirplaneTicketIcon color="primary" sx={{ fontSize: 150 }} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ fontStyle: 'oblique' }}>
                            Flight Number: {flight.flightNumber}
                            <br/>
                            Terminal: {flight.airportTerminal}
                            <br/>
                            From: {flight.from}                         
                            <br/>
                            To: {flight.to}
                            <br/>
                            Departure Date: {new Date(flight.departureDate).toLocaleString()}
                            <br/>
                            Arrival Date: {new Date(flight.arrivalDate).toLocaleString()}
                        </Typography>
                        <p>-------------------------------------------------------------------------------------</p>
                        <Typography variant="body2" color="text.secondary">
                            Available First Class Seats: {flight.availableFirstSeats}
                            <br/>
                            Price of First Class: {flight.firstPrice}
                            <br/>
                            First Class Baggage Allowance: {flight.firstBaggage}
                            <br/>
                            Available Business Seats: {flight.availableBusinessSeats}
                            <br/>
                            Price of Business: {flight.businessPrice}
                            <br/>
                            Business Class Baggage Allowance: {flight.businessBaggage} 
                            <br/>
                            Available Economy Seats: {flight.availableEconomySeats}
                            <br/>
                            Price of Economy: {flight.economyPrice}
                            <br/>
                            Economy Class Baggage Allowance: {flight.economyBaggage}
                            <br/>
                            Available Seats: {flight.availableTotalSeats}
                            <br/>
                            Trip Duration: {diffHrs} Hours {diffMins} Minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
                */
