import React from 'react';
import '../assets/tickets.css';
import Message from './Message';
import Loader from './Loader';
import TicketDetails from './TicketDetails';
import Error from './Error';
import { useParams } from 'react-router-dom';

export default function Tickets() {
  const [messages, setMessages] = React.useState([]);

  const [error, SetError] = React.useState(false);

  const [ticketInfo, setTicketinfo] = React.useState([]);

  const [comment, setComment] = React.useState({
    comment: '',
  });

  const { ticketId } = useParams();
  const { REACT_APP_DBURL } = process.env;

  React.useEffect(() => {
    fetch(`${REACT_APP_DBURL}/api/v1/ticket/${ticketId}`)
      .then((responsetoo) => {
        return responsetoo.json();
      })
      .then((data) => {
        if (!data.ticket.length > 0) {
          throw Error('Could not fetch Data for Resource');
        }
        SetError(false);
        setTicketinfo(data.ticket);
      })
      .catch((err) => SetError(true));

    fetch(`${REACT_APP_DBURL}/api/shop/tickets/chats/${ticketId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        SetError(false);
        setMessages(data.AllChats);
      })
      .catch((err) => {
        console.log('err');
        SetError(true);
      });
  }, []);

  function handleChange(event) {
    let { name, value } = event.target;
    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const messageTab = messages.map((message) => {
    return <Message key={message.created_at} comment={message.comment} time={message.created_at} />;
  });

  const tickdtls = ticketInfo.map((msg) => {
    return <TicketDetails key={msg.orderId} {...ticketInfo} />;
  });

  const asyncPostCall = async (shopname, ticketid, comment) => {
    try {
      const response = await fetch(`${REACT_APP_DBURL}/api/v1/tickets/add/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopName: shopname,
          ticketId: ticketid,
          comment: comment,
        }),
      });
      const data = await response.json();
      // enter you logic when the fetch is successful
      setMessages((oldMessages) => [...oldMessages, data.result]);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      SetError(true);
      console.log(error);
    }
  };

  async function submitComment(e) {
    e.preventDefault();
    await asyncPostCall(ticketInfo[0].shopName, ticketInfo[0].ticketId, comment.comment);
    setComment((prev) => ({
      ...prev,
      comment: '',
    }));
  }

  return !messages ? (
    <Loader />
  ) : (
    <>
      <div className="Tickets">
        <div className="ticket--menu">
          <div className="ticket-menu-wrapper">
            <button className="ticketMenuBtn">Back To Tickets</button>
            {tickdtls}
          </div>
        </div>

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
      </div>
    </>
  );
}
