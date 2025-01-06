import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import ChatsPage from './pages/ChatsPage';
import LoginPage2 from './pages/LoginPage2';
import Homepage from './pages/HomePage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login2" element={<LoginPage2 />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chatspage" element= {<ChatsPage/>} />
      </Routes>
    </Router>
  )
}

export default App
