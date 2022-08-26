import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from './components/NotFound';
import Tickets from './components/Tickets';
import Loader from './components/Loader';

export default function App() {
  const [isLoading, SetIsLoading] = React.useState(false);

  // setTimeout(() => {
  //   SetIsLoading(false);
  // }, 5000);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="ticket/:ticketId" element={<Tickets />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
