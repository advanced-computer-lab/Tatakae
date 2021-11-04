import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default class CreateFlight extends Component {
    state = {
        flightNumber: '',
        from: '',
        to: '',
        airportTerminal: '',
        departureDate: '',
        arrivalDate: '',
        economy: '',
        business: '',
        first: '',
        totalSeats: '',
        ePrice: '',
        bPrice: '',
        fPrice: '',
        baggage: ''
    }

    handleDeptDateChange= e=>{
        this.setState({departureDate: new Date(e.toLocaleDateString())})
    }

    handleArrDateChange= e=>{
        this.setState({arrivalDate: new Date(e.toLocaleDateString())})
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const data = {
            flightNumber: this.state.flightNumber,
            from: this.state.from,
            to: this.state.to,
            airportTerminal: this.state.airportTerminal,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            economySeats: this.state.economy,
            businessSeats: this.state.business,
            firstSeats: this.state.first,
            totalSeats: this.state.economy+this.state.business+this.state.first,
            economyPrice: this.state.ePrice,
            businessPrice: this.state.bPrice,
            firstPrice: this.state.fPrice,
            baggageAllowance: this.state.baggage
        };

        axios
            .post('http://localhost:8082/api/flights/flightcreate/', data)
            .then(res => {
                /*this.setState({
                    flightNumber: '',
                    from: '',
                    to: '',
                    airportTerminal: '',
                    departureDate: '',
                    arrivalDate: '',
                    economy: '',
                    business: '',
                    first: '',
                    totalSeats: '',
                    ePrice: '',
                    bPrice: '',
                    fPrice: '',
                    baggage: ''
                })*/
                //this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in CreateFlight!");
            })
    };

    render() {
        return (
            <div className='center'>
                <h1>Create a flight</h1>
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Flight Number</InputLabel>
                    <FilledInput
                        name='flightNumber'
                        id="flightNumber"
                        type='number'
                        value={this.state.flightNumber}
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
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Airport Terminal</InputLabel>
                    <FilledInput
                        name='airportTerminal'
                        id="airportTerminal"
                        value={this.state.airportTerminal}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Departure Date"
                        value={this.state.departureDate}
                        onChange={this.handleDeptDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Arrival Date"
                        value={this.state.arrivalDate}
                        onChange={this.handleArrDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Seats</InputLabel>
                    <FilledInput
                        name='economy'
                        id="economy"
                        type='number'
                        value={this.state.economy}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Seats</InputLabel>
                    <FilledInput
                        name='business'
                        id="business"
                        type='number'
                        value={this.state.business}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Class Seats</InputLabel>
                    <FilledInput
                        name='first'
                        id="first"
                        type='number'
                        value={this.state.first}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Price</InputLabel>
                    <FilledInput
                        name='ePrice'
                        id="ePrice"
                        type='number'
                        value={this.state.ePrice}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Price</InputLabel>
                    <FilledInput
                        name='bPrice'
                        id="bPrice"
                        type='number'
                        value={this.state.bPrice}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Class Price</InputLabel>
                    <FilledInput
                        name='fPrice'
                        id="fPrice"
                        type='number'
                        value={this.state.fPrice}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Baggage Count</InputLabel>
                    <FilledInput
                        name='baggage'
                        id="baggage"
                        type='number'
                        value={this.state.baggage}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <br />
                <Button variant="contained" onClick={this.handleSubmit}>
                    Create Flight
                </Button>

            </div>
        )
    }
}
