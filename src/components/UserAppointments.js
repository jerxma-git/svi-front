import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader} from "../api/base";
import axios from "axios";

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

  return (
    <div>
      { getRole() === "CLIENT" &&
        <div>
          <h2>Your Appointments</h2>
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id}>
                <p>Doctor: {`${appointment.doctorInfo.firstName} ${appointment.doctorInfo.lastName}`}</p>
                <p>Start Time: {appointment.startTime}</p>
                <p>End Time: {appointment.endTime}</p>
              </li>
            ))}
          </ul>
        </div>
      }
      { getRole() === "DOCTOR" &&
        <div>
          <h2>Your Appointments</h2>
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id}>
                {appointment.clientInfo && <p>Client: {`${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`}</p>}
                <p>Start Time: {appointment.startTime}</p>
                <p>End Time: {appointment.endTime}</p>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
};

export default UserAppointments