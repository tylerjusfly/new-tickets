import React from 'react'
import '../assets/details.css'

export default function TicketDetails (props) {
  return (
    <div className='Ticket--details'>
        <div>TicketId : {props[0].ticketId}</div>
        <div>Shop : {props[0].shopName}</div>
        <div>OrderId : {props[0].orderId} </div>
        <div> Product name : {props[0].product}</div>
        <div>Payment : {props[0].payment}</div>
        <div> Order Status : {props[0].orderStatus} </div>
        <div> Customer : {props[0].openBy} </div>
    </div>
  )
}
