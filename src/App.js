import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notfound from './components/NotFound';
import Tickets from './components/Tickets';

export default function App() {
  const [isLoading, SetIsLoading] = React.useState(true);

  setTimeout(() => {
    SetIsLoading(false);
  }, 6000);

  return (
    <BrowserRouter>
      {isLoading ? (
        <div>Loading......</div>
      ) : (
        <Routes>
          <Route path="ticket/:ticketId" element={<Tickets />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
