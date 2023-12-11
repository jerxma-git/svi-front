import React, { useState, useEffect } from 'react';
import { fetchDoctorInfo, fetchDoctorAppointments } from '../api/doctors'; // Mocked API functions for fetching doctor info and appointments
import { useParams } from 'react-router-dom';

const DoctorSchedule = () => {
  const { doctorId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorInformation = await fetchDoctorInfo(doctorId);
        if (doctorInformation != null) {
          setDoctorInfo(doctorInformation);
        }

        // todo: remove constants -> set values from ui
        const startDate = "20231010"
        const endDate = "20231212"
        const doctorAppointments = await fetchDoctorAppointments(doctorId, startDate, endDate);
        if (doctorAppointments != null) {
          setAppointments(doctorAppointments);
        }
        
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
            { appointment.clientInfo &&
                <p>Client: {`${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`}</p>
            }
            <p>Start Time: {appointment.startTime}</p>
            <p>End Time: {appointment.endTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorSchedule;
