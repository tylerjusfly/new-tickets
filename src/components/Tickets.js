import React from 'react';
import '../assets/tickets.css';
import Message from './Message';
import TicketDetails from './TicketDetails';
import Loader from './Loader';
import Error from './Error';
import { useParams } from 'react-router-dom';
import { useTicket } from '../hooks/useTicket';

export default function Tickets() {
  const [comment, setComment] = React.useState({
    comment: ''
  });

  const { ticketId } = useParams();

  //Custom Hooks
  const { messages, ticketInfo, error, asyncPostCall, loading } = useTicket(ticketId);

  function handleChange(event) {
    let { name, value } = event.target;
    setComment((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const messageTab = messages.map((message) => {
    return <Message key={message.created_at} comment={message.comment} time={message.created_at} />;
  });

  const tickdtls = ticketInfo.map((msg) => {
    return <TicketDetails key={msg.orderId} {...ticketInfo} />;
  });

  async function submitComment(e) {
    e.preventDefault();
    await asyncPostCall(ticketInfo[0].shopName, ticketInfo[0].ticketId, comment.comment);
    setComment((prev) => ({
      ...prev,
      comment: ''
    }));
  }

  return (
    <>
      <div className="Tickets">
        <div className="ticket--menu">
          <div className="ticket-menu-wrapper">
            <button className="ticketMenuBtn">Back To Tickets</button>
            {tickdtls}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="ticket--Chat">
            <div className="ticketChatWrapper">
              <div className="ticket-chat-top">
                {error ? (
                  <h1>
                    <Error />{' '}
                  </h1>
                ) : (
                  <div> {messageTab} </div>
                )}
              </div>
              {!error && (
                <form className="ticket-chat-bottom" onSubmit={submitComment}>
                  <textarea
                    placeholder="Write a mesaage"
                    className="chat-message-input"
                    value={comment.comment}
                    name="comment"
                    onChange={handleChange}
                  ></textarea>
                  <button className="send-message-button"> Send </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* end of laoding */}
      </div>
    </>
  );
}
