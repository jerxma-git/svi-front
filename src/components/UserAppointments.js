import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader} from "../api/base";
import axios from "axios";
import doctor_face from "../images/doctor.png";

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

  const cancelAppointment = (id) => {
    const request = `${BASE_URL}/appointments`;

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
          <ul className="User-appointments-list">
            {appointments.map(appointment => (
              <li className="User-appointments-item" key={appointment.id}>
                <div className="User-appointments-item-img-container">
                  <img className="User-appointments-item-img" src={doctor_face} alt="Italian Trulli"/>
                </div>
                <p>Doctor: {`${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName}`}</p>
                <p>Start Time: {appointment.startTime}</p>
                <p>End Time: {appointment.endTime}</p>
                <button className="User-appointments-item-info-button" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        </div>
      }
      { getRole() === "DOCTOR" &&
        <div className="User-appointments-block">
          <h2>Your Appointments</h2>
          <ul className="User-appointments-list">
            {appointments.map(appointment => (
              <li className="User-appointments-item" key={appointment.id}>
                <div className="User-appointments-item-img-container">
                  <img className="User-appointments-item-img" src={doctor_face} alt="Italian Trulli"/>
                </div>
                <div className="User-appointments-item-info">
                  {appointment.clientInfo && <p>Client: {`${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`}</p>}
                  <p>Start Time: {appointment.startTime}</p>
                  <p>End Time: {appointment.endTime}</p>
                    <button className="User-appointments-item-info-button" onClick={() => closeAppointment(appointment.id)}>Close</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
};

export default UserAppointments