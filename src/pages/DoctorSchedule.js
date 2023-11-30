import React, { useState, useEffect } from 'react';
import { fetchDoctorInfo, fetchDoctorAppointments } from '../api/doctor'; // Mocked API functions for fetching doctor info and appointments

const DoctorSchedule = ({ doctorId }) => {

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorInformation = await fetchDoctorInfo(doctorId);
        setDoctorInfo(doctorInformation);

        const doctorAppointments = await fetchDoctorAppointments(doctorId);
        setAppointments(doctorAppointments);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchData();
  }, [doctorId]);

  return (

    <div>
      {doctorInfo && (
        <div>
          <h2>{`${doctorInfo.firstName} ${doctorInfo.lastName}'s Schedule`}</h2>
          <p>Email: {doctorInfo.email}</p>
          <p>Date of Birth: {doctorInfo.dateOfBirth}</p>
          <p>Position: {doctorInfo.positionName}</p>
        </div>
      )}

    {/* TODO: make a component with appointment slots and replace this bs with it */}

      <h3>Schedule</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p>Client: {`${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`}</p>
            <p>Start Time: {appointment.startTime}</p>
            <p>End Time: {appointment.endTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSchedule;
