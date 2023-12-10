import React, { useEffect, useState } from 'react';
import { fetchClientOwnAppointments } from '../api/clients';

const AppointmentList = () => {

    // todo rm
    const [appointments, setAppointments] = useState([]);
    const [dateRange, setDateRange] = useState(null);
    useEffect(() => {
      const getAppointments = async () => {
        try {
          let start, end;
          if (dateRange === null) {
            start = new Date();
            end = new Date();
          } else {
            start = dateRange['start'];
            end = dateRange['end'];
          }
          
          const appointments = await fetchClientOwnAppointments(start, end);
          if (appointments != null) {
            setAppointments(appointments);
          }
        } catch(error) {
          console.error("error fetching appointments", error);
        }
      };
      getAppointments();
    }, [dateRange]);


  // temporary: to be removed/refined
  function toggleDateRange() {
    if (dateRange === null) {
      setDateRange({
        "start": new Date(),
        "end": new Date().setDate(new Date().getDate() + 7),
      });
    } else {
      setDateRange(null);
    }
  }

  return (
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
      <button onclick={toggleDateRange}></button>
    </div>
  );
};

export default AppointmentList;