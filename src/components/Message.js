import React from 'react'
import '../assets/message.css'

export default function Message(props) {
  const adjustDateToLocal = (date) =>{
    const now = new Date();
    const datefromAPITimeStamp = (new Date(date)).getTime();
    const nowTimeStamp = now.getTime();
    
    const microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp);
    // Math.round is used instead of Math.floor to account for certain DST cases
    // Number of milliseconds per day =
    //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
    const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60  * 24));
    
      return daysDiff;
  }


  return (
    <div className= "Message">
        <div className="message-top">
            <p className="message-text"> {props.comment} </p>
        </div>
        <div className="message-bottom"> {adjustDateToLocal(props.time)} days Ago </div>
    </div>
  )
}
