import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, redirect, Route, Routes} from 'react-router-dom';
import Doctors from './pages/Doctors'
import Footer from './components/Footer'
import Header from './components/Header'
import Appointments from './pages/Appointments'
import Login from './components/auth/Login';
import DoctorSchedule from './pages/DoctorSchedule';
import Register from "./components/auth/Register";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import styles from './App.css'
import Profile from "./components/Profile";

function App() {
  return (
      <Router>
        <Header/>
        <div className="main">
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/doctors" element={
              <ProtectedRoute>
                <Doctors/>
              </ProtectedRoute>
            }/>
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments/>
              </ProtectedRoute>
            }/>
            <Route path="/schedule/:doctorId" element={
              <ProtectedRoute>
                <DoctorSchedule/>
              </ProtectedRoute>
            }/>
            <Route path="/profile/:userId" element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }/>
          </Routes>
        </div>
        <Footer/>
      </Router>
  )
}

export default App;