import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventIcon from "@mui/icons-material/Event";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import plane from "../../assets/plane.jpg";

export default function TicketDetails(props) {
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
        <Grid item xs>
          <Typography style={{ fontSize: "3em", color: "white" }}>
            {props.flight.from}
          </Typography>
        </Grid>
        <Grid style={{ fontSize: "3em" }} item xs={3}>
          <FlightIcon
            style={{ transform: "scale(1.5)  rotate(90deg)", color: "white" }}
          />
        </Grid>
        <Grid item xs>
          <Typography style={{ fontSize: "3em", color: "white" }}>
            {props.flight.to}
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
                <Typography>{props.flight.from}</Typography>
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
                  <Typography>{props.flight.departureTerminal}</Typography>
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
                <Typography>{props.flight.to}</Typography>
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
                  <Typography>{props.flight.arrivalTerminal}</Typography>
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
                  {new Date(props.flight.departureDate).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                  <br />
                  at{" "}
                  {new Date(props.flight.departureDate).toLocaleString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}
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
                    {new Date(props.flight.arrivalDate).toLocaleString(
                      "en-US",
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                    <br />
                    at{" "}
                    {new Date(props.flight.arrivalDate).toLocaleString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {props.firstSelected && props.firstSelected.length !== 0   && (
                    <TableCell>First</TableCell>
                  )}
                  {props.businessSelected && props.businessSelected.length !== 0 && (
                    <TableCell>Business</TableCell>
                  )}
                  {props.economySelected && props.economySelected.length !== 0 && (
                    <TableCell>Economy</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {props.firstSelected && props.firstSelected.length !== 0  && (
                    <TableCell>
                      {props.firstSelected.map((seat) => (
                        <Typography> {seat.seatNumber},  </Typography>
                      ))}
                    </TableCell>
                  )}
                  {props.businessSelected && props.businessSelected.length !== 0 && (
                    <TableCell> {props.businessSelected.map((seat) => (
                        <Typography> {seat.seatNumber},  </Typography>
                      ))}</TableCell>
                  )}
                  {props.economySelected && props.economySelected.length !== 0 && (
                    <TableCell> {props.economySelected.map((seat) => (
                        <Typography> {seat.seatNumber},  </Typography>
                      ))}</TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <AttachMoneyIcon style={{ transform: "scale(1.2)" }} />
          </ListItemAvatar>
          <Grid container>
            <Grid item align="left" xs={12}>
              <Typography
                sx={{ mt: 0.5 }}
                color="text.secondary"
                display="block"
                variant="caption"
              >
                Total Price
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography>${props.totalPrice}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </List>
    </Grid>
  );
}
