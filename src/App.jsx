import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import LoginRegister from './pages/Loginregister'


function App() {

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginRegister />} />
    </Routes>
  )
}

export default App
