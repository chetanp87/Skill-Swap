import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import LoginRegister from './pages/Loginregister'
import ProfileForm from './pages/ProfileForm';
import Requests from './pages/Requests';


function App() {

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginRegister />} />
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="/requests" element={<Requests />} />

    </Routes>
  )
}

export default App
