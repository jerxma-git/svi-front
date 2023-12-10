import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../api/doctors';

const DoctorList = () => {

    // todo rm
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const doctors = await fetchDoctors();
        if (doctors != null) {
          setDoctors(doctors);
        }

      } catch(error) {
        console.error("error fetching doctors");
      }
    }
    getDoctors();
  }, []);

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