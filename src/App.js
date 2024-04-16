import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/Login';
import FloatingButton from './views/FloatingButton';
import Tsekbot from './views/Tsekbot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<FloatingButton/>} />
        {/* <Route path='/' element={<Tsekbot/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
