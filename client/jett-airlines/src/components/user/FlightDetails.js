import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LuggageIcon from "@mui/icons-material/Luggage";
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
import plane from "../../assets/plane.jpg";

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
    <Grid style={{ width: "450px" }} fullWidth container>
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
        <Grid item  xs>
          <Typography style={{ fontSize: "3em", color: "white" }}>
          {flight.from}
          </Typography>
        </Grid>
        <Grid style={{ fontSize: "3em" }} item xs={3}>
          <FlightIcon
            style={{ transform: "scale(1.5)  rotate(90deg)", color: "white" }}
          />
        </Grid>
        <Grid  item xs>
          <Typography style={{ fontSize: "3em", color: "white" }}>
          {flight.to}
          </Typography>
        </Grid>
      </Grid>
      <List
        sx={{
          width: "450px",
          paddingTop: "0",
          paddingBottom: "0",
        }}
      >
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
              <Grid>
                <Typography>
                {flight.from}
                </Typography>
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
                    Departure Terminal
                  </Typography>
                </Grid>
                <Grid>
                <Typography>
                  {flight.departureTerminal}
                  </Typography>
                  </Grid>
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
              <Grid>
              <Typography>
                {flight.to}
                </Typography>
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
                    Arrival Terminal
                  </Typography>
                </Grid>
                <Grid>
                <Typography>
                  {flight.arrivalTerminal}
                  </Typography>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <EventIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container columns={16}>
            <Grid container item xs={7}>
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
              <Grid>
              <Typography>
                {new Date(flight.departureDate).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <br />
                at{" "}
                {new Date(flight.departureDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ flexGrow: 3 }} xs={1} />
            <Grid item xs>
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
                <Grid>
                <Typography>
                  {new Date(flight.arrivalDate).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  <br />
                  at{" "}
                  {new Date(flight.arrivalDate).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  </Typography>
                </Grid>
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
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <SupervisorAccountIcon style={{ transform: "scale(1.2)" }} />
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
            <Typography>
              {tab === "First" ? (
                <p>{flight.availableFirstSeats}</p>
              ) : (
                <p>
                  {tab === "Business" ? (
                    <p>{flight.availableBusinessSeats}</p>
                  ) : (
                    <p>{flight.availableEconomySeats}</p>
                  )}
                </p>
              )}
             </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <LuggageIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container>
            <Grid item align="left" xs={12}>
              <Typography
                sx={{ mt: 0.5 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                Baggage allowance
              </Typography>
            </Grid>
            <Grid item xs>
            <Typography>
              {tab === "First" ? (
                <p>{flight.firstBaggage} KG</p>
              ) : (
                <p>
                  {tab === "Business" ? (
                    <p>{flight.businessBaggage} KG</p>
                  ) : (
                    <p>{flight.economyBaggage} KG</p>
                  )}
                </p>
              )}
              </Typography>
              <Typography
                color="text.secondary"
                display="block"
                variant="caption"
              >
                <Typography>
                <small>*in kilograms</small>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
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
              <Grid>
              <Typography>
                {tab === "First" ? (
                  <p>${flight.firstPrice}</p>
                ) : (
                  <p>
                    {tab === "Business" ? (
                      <p>${flight.businessPrice}</p>
                    ) : (
                      <p>${flight.economyPrice}</p>
                    )}
                  </p>
                )}
              </Typography>
              </Grid>
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
                <Grid>
                <Typography>
                  {tab === "First" ? (
                    <p>${0.5 * flight.firstPrice}</p>
                  ) : (
                    <p>
                      {tab === "Business" ? (
                        <p>${0.5 * flight.businessPrice}</p>
                      ) : (
                        <p>${0.5 * flight.economyPrice}</p>
                      )}
                    </p>
                  )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Typography
              color="text.secondary"
              display="block"
              variant="caption"
            >
             
              <small>*Childern Prices are 50% of the full price</small>
             
            </Typography>
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
}
