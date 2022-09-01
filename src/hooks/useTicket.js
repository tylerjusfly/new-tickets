import React from 'react';

export function useTicket(ticketId) {
  const [messages, setMessages] = React.useState([]);
  const [ticketInfo, setTicketinfo] = React.useState([]);
  const [error, SetError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log('err');
        SetError(true);
      });
  }, []);

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

  //return
  return {
    messages,
    ticketInfo,
    error,
    asyncPostCall,
    loading,
  };
}
