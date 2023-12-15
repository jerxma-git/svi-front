import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader} from "../api/base";
import axios from "axios";
import doctor_face from "../images/doctor.png";
import client_face from "../images/client.png"
import free from "../images/free.png"

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getRole = () => {
    return localStorage.getItem("role")
  }

  const getUserId = () => {
    return localStorage.getItem("userId")
  }

  useEffect(() => {
    getAppointments()
  }, []);

  const getAppointments = () => {
    const request = `${BASE_URL}/appointments/user/${getUserId()}?startDate=01011990&endDate=01012100`;
    axios.get(request, {
      headers: getAuthHeader()
    }).then( appointments => {
      setAppointments(appointments.data)
    }).catch(() => {
      console.log("error")
    })
  }

  const closeAppointment = (id) => {
    const request = `${BASE_URL}/appointments`;
    axios.put(request, {
      "id": id,
      "status": "CLOSED"
    }, {
      headers: getAuthHeader()
    }).catch(err => {
      console.error("error occurred")
    })
  }

  const openAppointment = (id) => {
    const request = `${BASE_URL}/appointments`;
    axios.put(request, {
      "id": id,
      "status": "AVAILABLE"
    }, {
      headers: getAuthHeader()
    }).catch(err => {
      console.error("error occurred")
    })
  }

  const cancelAppointment = (id) => {
    const request = `${BASE_URL}/appointments`;

    const filteredAppointments = appointments.filter(function (val) {
      return val.id !== id
    })
    console.log(filteredAppointments)
    setAppointments(filteredAppointments)

    axios.put(request, {
        "id": id,
        "status": "AVAILABLE",
        "clientId": null
      }, {
        headers: getAuthHeader()
      }
    ).catch(err => {
      console.error("error occurred")
    })
  }

  return (
    <div className="User-appointments-block">
      { getRole() === "CLIENT" &&
        <div className="User-appointments-block">
          <h2>Your Appointments</h2>
          { appointments.length === 0 &&
            <p>You have no appointments</p>
          }
          { appointments.length !== 0 &&
          <ul className="User-appointments-list">
            {appointments.map(appointment => (
              <li className="User-appointments-item" key={appointment.id}>
                <div className="User-appointments-item-img-container">
                  <img className="User-appointments-item-img" src={doctor_face} alt="Italian Trulli"/>
                </div>
                <div className="User-appointments-item-info">
                  <p className="User-appointments-item-info-name"><strong>Doctor:</strong> {`${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName}`}</p>
                  <p><strong>Start Time:</strong> {appointment.startTime}</p>
                  <p><strong>End Time</strong> {appointment.endTime}</p>
                  <button className="User-appointments-item-info-button" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>  
                </div>
                </li>
            ))}
          </ul>
          }
        </div>
      }
      { getRole() === "DOCTOR" &&
        <div className="User-appointments-block">
          <h2>Your Appointments</h2>
          { appointments.length === 0 &&
            <p>You have no appointments</p>
          }
          { appointments.length !== 0 &&
          <ul className="User-appointments-list">
            {appointments.map(appointment => (
              <li className="User-appointments-item" key={appointment.id}>
                <div className="User-appointments-item-img-container">
                  {appointment.clientInfo &&
                  <img className="User-appointments-item-img" src={client_face} alt="Italian Trulli"/>
                  }
                  {appointment.clientInfo == null &&
                    <img className="User-appointments-item-img" src={free} alt="Italian Trulli"/>
                  }
                </div>
                <div className="User-appointments-item-info">
                  {appointment.clientInfo &&
                    <p className="User-appointments-item-info-name"><strong>Client:</strong> {`${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`}</p>
                  }
                  <p><strong>Start Time:</strong> {appointment.startTime}</p>
                  <p><strong>End Time:</strong> {appointment.endTime}</p>
                  {appointment.clientInfo == null && appointment.status !== "CLOSED" &&
                    <button className="User-appointments-item-info-button" onClick={() => closeAppointment(appointment.id)}>Close</button>
                  }
                  {appointment.clientInfo == null && appointment.status === "CLOSED" &&
                    <button className="User-appointments-item-info-button" onClick={() => openAppointment(appointment.id)}>Open</button>
                  }
                </div>
              </li>
            ))}
          </ul>
          }
        </div>
      }
    </div>
  )
};

export default UserAppointments