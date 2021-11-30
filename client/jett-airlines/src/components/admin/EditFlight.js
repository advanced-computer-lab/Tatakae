import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default class EditFlight extends Component {

    state = {
        flightNumber: this.props.flight.flightNumber,
        from: this.props.flight.from,
        to: this.props.flight.to,
        departureTerminal: this.props.flight.departureTerminal,
        arrivalTerminal: this.props.flight.arrivalTerminal,
        departureDate: this.props.flight.departureDate,
        arrivalDate: this.props.flight.arrivalDate,
        economy: [].concat(this.props.flight.economySeats).length,
        business: [].concat(this.props.flight.businessSeats).length,
        first: [].concat(this.props.flight.firstSeats).length,
        totalSeats: this.props.flight.totalSeats,
        ePrice: this.props.flight.economyPrice,
        bPrice: this.props.flight.businessPrice,
        fPrice: this.props.flight.firstPrice,
        fBaggage: this.props.flight.firstBaggage,
        bBaggage: this.props.flight.businessBaggage,
        eBaggage: this.props.flight.economyBaggage
    }

    handleDeptDateChange= e=>{
        this.setState({departureDate: new Date(e)})
    }

    handleArrDateChange= e=>{
        this.setState({arrivalDate: new Date(e)})
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const data = {
            flightNumber: this.state.flightNumber,
            from: this.state.from,
            to: this.state.to,
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            economySeats: this.state.economy,
            businessSeats: this.state.business,
            firstSeats: this.state.first,
            changeFlag: (this.props.flight.availableTotalSeats !== this.props.flight.totalSeats),
            totalSeats: Number(this.state.economy)+Number(this.state.business)+Number(this.state.first),
            economyPrice: this.state.ePrice,
            businessPrice: this.state.bPrice,
            firstPrice: this.state.fPrice,
            firstBaggage: this.state.fBaggage,
            businessBaggage: this.state.bBaggage,
            economyBaggage: this.state.eBaggage,
            token: sessionStorage.getItem('token')
        };
        axios.patch(`http://localhost:8082/api/flights/flightupdate/${this.props.flight._id}`, data)
            .then(() => {
                this.props.closeDialog()
                this.props.setRefresh(!this.props.refresh)
                //this.props.history.push('/');
            })
            .catch(() => {
                console.log("Error in EditFlight!");
            })
    };

    render() {
        return (
            <div className='center'>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Flight Number</InputLabel>
                    <FilledInput
                        name='flightNumber'
                        id="flightNumber"
                        value={this.state.flightNumber}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Departure Terminal</InputLabel>
                    <FilledInput
                        name='departureTerminal'
                        id="departureTerminal"
                        value={this.state.departureTerminal}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Arrival Terminal</InputLabel>
                    <FilledInput
                        name='arrivalTerminal'
                        id="arrivalTerminal"
                        value={this.state.arrivalTerminal}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>From</InputLabel>
                    <FilledInput
                        name='from'
                        id="from"
                        value={this.state.from}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>To</InputLabel>
                    <FilledInput
                        name='to'
                        id="to"
                        value={this.state.to}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Departure Date"
                        value={this.state.departureDate}
                        onChange={this.handleDeptDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Arrival Date"
                        value={this.state.arrivalDate}
                        onChange={this.handleArrDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Class Seats</InputLabel>
                    <FilledInput
                        name='first'
                        id="first"
                        value={this.state.first}
                        onChange={this.handleChange}
                        disabled = {(this.props.flight.availableTotalSeats !== this.props.flight.totalSeats)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Class Price</InputLabel>
                    <FilledInput
                        name='fPrice'
                        id="fPrice"
                        value={this.state.fPrice}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Baggage Allowance</InputLabel>
                    <FilledInput
                        name='fBaggage'
                        id="fBaggage"
                        value={this.state.fBaggage}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Seats</InputLabel>
                    <FilledInput
                        name='business'
                        id="business"
                        value={this.state.business}
                        onChange={this.handleChange}
                        disabled = {(this.props.flight.availableTotalSeats !== this.props.flight.totalSeats)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Seats</InputLabel>
                    <FilledInput
                        name='economy'
                        id="economy"
                        value={this.state.economy}
                        onChange={this.handleChange}
                        disabled = {(this.props.flight.availableTotalSeats !== this.props.flight.totalSeats)}
                    />
                </FormControl>
            
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Price</InputLabel>
                    <FilledInput
                        name='bPrice'
                        id="bPrice"
                        value={this.state.bPrice}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Price</InputLabel>
                    <FilledInput
                        name='ePrice'
                        id="ePrice"
                        value={this.state.ePrice}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Baggage Allowance</InputLabel>
                    <FilledInput
                        name='bBaggage'
                        id="bBaggage"
                        value={this.state.bBaggage}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Baggage Allowance</InputLabel>
                    <FilledInput
                        name='eBaggage'
                        id="eBaggage"
                        value={this.state.eBaggage}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <br />
                <Button variant="contained" onClick={this.handleSubmit}>
                    Update Flight
                </Button>

            </div>
        )
    }
}
