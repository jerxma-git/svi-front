import React from 'react';

const AppointmentList = () => {

    // todo rm
  const appointments = [
    {
      id: 1,
      clientInfo: {
        id: 3,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        middleName: 'Ivanovich',
        email: 'ivan@243gm3sdfail.com',
        dateOfBirth: '11.11.2001',
      },
      doctorInfo: {
        id: 2,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        middleName: 'Ivanovich',
        email: 'iv23SDF4an@243gm3sdfail.com',
        dateOfBirth: '11.11.2001',
      },
      startTime: '2023-11-30 15:00',
      endTime: '2023-11-30 15:15',
      status: 'AVAILABLE',
    },
  ];

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