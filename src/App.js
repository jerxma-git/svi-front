import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Doctors from './pages/Doctors'
import Footer from './components/Footer'
import Header from './components/Header'
import Appointments from './pages/Appointments'
import Login from './components/auth/Login';
import DoctorSchedule from './pages/DoctorSchedule';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  return (
    <div>
      {!isAuthenticated  
        ? (<Login onLogin={handleLogin}/>) 
        : (
        <Router>
          <Header/>
          <div>
            <Routes>
              <Route path="/doctors" element={<Doctors/>}/>
              <Route path="/appointments" element={<Appointments/>}/>
              <Route path="/schedule/:doctorId" element={<DoctorSchedule/>}/>
            </Routes>
          </div>
          <Footer/>
        </Router>
        )
      }
    </div>
  )
}

export default App;