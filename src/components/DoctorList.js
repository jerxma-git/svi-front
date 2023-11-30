import React from 'react';
import { Link } from 'react-router-dom';

const DoctorList = () => {

    // todo rm
    const doctors = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'M',
      email: 'john.doe@example.com',
      dateOfBirth: '01.01.1980',
      positionId: 1,
      positionName: 'Cardiologist',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: 'A',
      email: 'jane.smith@example.com',
      dateOfBirth: '02.02.1990',
      positionId: 2,
      positionName: 'Orthopedic Surgeon',
    },
  ];

  return (
    <div>
      <h1>Registered Doctors</h1>
      
    <ul>
    {doctors.map((doctor) => (
        <li key={doctor.id}>
        <strong>ID:</strong> {doctor.id}<br />
        <strong>Name:</strong> {`${doctor.firstName} ${doctor.middleName} ${doctor.lastName}`}<br />
        <strong>Email:</strong> {doctor.email}<br />
        <strong>Date of Birth:</strong> {doctor.dateOfBirth}<br />
        <strong>Position:</strong> {doctor.positionName}<br />

        {/* Button for redirection */}
        <Link to={`/schedule/${doctor.id}`}>
            <button>View schedule</button>
        </Link>
        </li>
    ))}
    </ul>
    </div>
  );
};

export default DoctorList;