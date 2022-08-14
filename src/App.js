import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Notfound from './components/NotFound'
import Tickets from './components/Tickets'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='ticket/:ticketId' element ={ <Tickets/>}/>
      <Route path='*' element ={ <Notfound/> }/>
    </Routes>
    </BrowserRouter>
  )

}
