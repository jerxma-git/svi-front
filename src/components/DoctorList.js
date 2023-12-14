import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../api/doctors';
import doctor_face from "../images/doctor.png";

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
          <img src={doctor_face} alt="Italian Trulli" width="200" height="200"/>
          <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
          <h3>{doctor.positionName}</h3>
          <p>{doctor.experience} years experience</p>
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