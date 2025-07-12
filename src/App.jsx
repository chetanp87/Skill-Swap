import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import LoginRegister from './pages/Loginregister'
import ProfileForm from './pages/ProfileForm';


function App() {

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginRegister />} />
      <Route path="/profile" element={<ProfileForm />} />
    </Routes>
  )
}

export default App
