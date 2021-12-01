import React from 'react'
//import './TicketCard.css'

export default function TicketCard(props) {






    return (
       <div class="main"> <div class="body">
            <div class="flight-card">
                <div class="flight-card-header">
                    <div class="flight-logo">
                        <img src="https://book.jetblue.com/assets/header/img/jetblue-white-reg.png" alt="" />
                    </div>
                    <div class="flight-data">
                        <div class="passanger-details">
                            <span class="title">passenger</span>
                            <span class="detail">{props.T}</span>
                        </div>
                        <div class="passanger-depart">
                            <span class="title">Departs</span>
                            <span class="detail">props.ticket.departureDate</span>
                        </div>
                        <div class="passanger-arrives">
                            <span class="title">Arrives</span>
                            <span class="detail">props.ticket.arrivalDate</span>
                        </div>
                    </div>
                </div>
                <div class="flight-card-content">
                    <div class="flight-row">
                        <div class="flight-from">
                            <span class="from-code">TIA</span>
                            <span class="from-city">Tirane, Albania</span>
                        </div>
                        <div class="plane">
                            <img src="https://cdn.onlinewebfonts.com/svg/img_537856.svg" alt="" />
                        </div>
                        <div class="flight-to">
                            <span class="to-code">MUC</span>
                            <span class="to-city">Munich, Germany</span>
                        </div>
                    </div>
                    <div class="flight-details-row">
                        <div class="flight-operator">
                            <span class="title">OPERATOR</span>
                            <span class="detail">Jetblue Airways</span>
                        </div>
                        <div class="flight-number">
                            <span class="title">FLIGHT</span>
                            <span class="detail">JT22554D</span>
                        </div>
                        <div class="flight-class">
                            <span class="title">CLASS</span>
                            <span class="detail">Economy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
