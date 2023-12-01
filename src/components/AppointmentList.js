import React, { useEffect, useState } from 'react';
import { fetchClientOwnAppointments } from '../api/clients';

const AppointmentList = () => {

    // todo rm
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
      const getAppointments = async () => {
        try {
          const appointments = await fetchClientOwnAppointments();
          if (appointments != null) {
            setAppointments(appointments);
          }
        } catch(error) {
          console.error("error fetching appointments")
        }
      };
      getAppointments();
    });

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
    </div>
  );
};

export default AppointmentList;