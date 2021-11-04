import React, { Component } from 'react'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Button from '@mui/material/Button';


export default class CreateFlight extends Component {
    state = {
        from: '',
        to: '',
        date: '',
        economy: '',
        business: '',
        first: '',
        seats: '',
        price: ''
    }
    render() {
        return (
            <div className='center'>
                <h1>Create a flight</h1>
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

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>To be changed to date</InputLabel>
                    <FilledInput
                        name='to'
                        id="to"
                        value={this.state.to}
                        onChange={this.handleChange}
                    />
                </FormControl>
                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Economy Seats</InputLabel>
                    <FilledInput
                        name='economy'
                        id="economy"
                        value={this.state.economy}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Business Seats</InputLabel>
                    <FilledInput
                        name='business'
                        id="business"
                        value={this.state.business}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>First Class Seats</InputLabel>
                    <FilledInput
                        name='first'
                        id="first"
                        value={this.state.first}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <br />
                <FormControl sx={{ m: 1 }} variant="filled">
                    <InputLabel>Price</InputLabel>
                    <FilledInput
                        name='price'
                        id="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                    />
                </FormControl>

                <br/>
                <br/>

                <Button variant="contained">
                    Create Flight
                </Button>

            </div>
        )
    }
}
