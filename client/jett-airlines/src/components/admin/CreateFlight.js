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
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";

export default class CreateFlight extends Component {
    constructor() {
        super();
        this.vantaRef = React.createRef();
    }
    componentDidMount() {
        this.vantaEffect = CLOUDS({
            el: this.vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
        });
    }
    componentWillUnmount() {
        if (this.vantaEffect) {
            this.vantaEffect.destroy();
        }
    }
    state = {
        flightNumber: '',
        from: '',
        to: '',
        departureTerminal: '',
        arrivalTerminal: '',
        departureDate: new Date(),
        arrivalDate: new Date(),
        economy: '',
        business: '',
        first: '',
        totalSeats: 0,
        ePrice: '',
        bPrice: '',
        fPrice: '',
        eBaggage: '',
        bBaggage: '',
        fBaggage: ''
    }

    handleDeptDateChange = e => {
        this.setState({ departureDate: new Date(e) })
    }

    handleArrDateChange = e => {
        this.setState({ arrivalDate: new Date(e) })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const data = {
            flightNumber: (this.state.flightNumber).toUpperCase(),
            from: this.state.from,
            to: this.state.to,
            departureTerminal: this.state.departureTerminal,
            arrivalTerminal: this.state.arrivalTerminal,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate,
            economySeats: this.state.economy,
            businessSeats: this.state.business,
            firstSeats: this.state.first,
            totalSeats: Number(this.state.economy) + Number(this.state.business) + Number(this.state.first),
            economyPrice: this.state.ePrice,
            businessPrice: this.state.bPrice,
            firstPrice: this.state.fPrice,
            economyBaggage: this.state.eBaggage,
            businessBaggage: this.state.bBaggage,
            firstBaggage: this.state.fBaggage,
            token: sessionStorage.getItem('token')
        };

        axios.post('http://localhost:8082/api/flights/flightcreate/', data)
            .then(res => {
                this.setState({
                    flightNumber: '',
                    from: '',
                    to: '',
                    departureTerminal: '',
                    arrivalTerminal: '',
                    departureDate: '',
                    arrivalDate: '',
                    economy: '',
                    business: '',
                    first: '',
                    totalSeats: '',
                    ePrice: '',
                    bPrice: '',
                    fPrice: '',
                    eBaggage: '',
                    bBaggage: '',
                    fBaggage: ''
                })
                //this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div id="wrapper">
                <div className='background' ref={this.vantaRef}>
                    <div id="form" className='center'>
                        <br />
                        <br />
                        <p>Basic Info</p>
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
                        <p>Departure & Arrival Dates</p>
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
                        <br />
                        <p>Cabin Info</p>
                        <br />
                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>Economy Seats No.</InputLabel>
                            <FilledInput
                                name='economy'
                                id="economy"
                                value={this.state.economy}
                                onChange={this.handleChange}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>Business Seats No.</InputLabel>
                            <FilledInput
                                name='business'
                                id="business"
                                value={this.state.business}
                                onChange={this.handleChange}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>First Class Seats No.</InputLabel>
                            <FilledInput
                                name='first'
                                id="first"
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
                                value={this.state.ePrice}
                                onChange={this.handleChange}
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
                            <InputLabel>First Class Price</InputLabel>
                            <FilledInput
                                name='fPrice'
                                id="fPrice"
                                value={this.state.fPrice}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <br />
                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>Economy Baggage Allownce</InputLabel>
                            <FilledInput
                                name='eBaggage'
                                id="eBaggage"
                                value={this.state.eBaggage}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>Business Baggage Allownce</InputLabel>
                            <FilledInput
                                name='bBaggage'
                                id="bBaggage"
                                value={this.state.bBaggage}
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="filled">
                            <InputLabel>First Baggage Allownce</InputLabel>
                            <FilledInput
                                name='fBaggage'
                                id="fBaggage"
                                value={this.state.fBaggage}
                                onChange={this.handleChange}
                            />
                        </FormControl>

                        <br />
                        <br />
                        <Button variant="contained" onClick={this.handleSubmit}>
                            Create Flight
                        </Button>
                        <br />
                        <br />
                        <Button variant="contained" href='/home'>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
