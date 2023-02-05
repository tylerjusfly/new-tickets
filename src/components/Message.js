import React from 'react';
import '../assets/message.css';
import { parseISO, formatDistanceToNow } from 'date-fns';

export default function Message(props) {
  let timeAgo = '';
  if (props.time) {
    const date = parseISO(props.time);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <div className="Message">
      <div className="message-top">
        <p className="message-text"> {props.comment} </p>
      </div>
      <div className="message-bottom"> {timeAgo} </div>
    </div>
  );
}
