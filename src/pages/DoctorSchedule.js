import React, { useState, useEffect } from 'react';
import { fetchDoctorInfo, fetchDoctorAppointments } from '../api/doctors'; // Mocked API functions for fetching doctor info and appointments
import { useParams } from 'react-router-dom';
import { ScheduleViewer } from '../components/doctor-schedule/ScheduleViewer';
import doctor_face from '../images/doctor.png'

const DoctorSchedule = () => {
  const { doctorId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const fillDoctorInfo = async () => {
      try {
        const doctorInformation = await fetchDoctorInfo(doctorId);
        if (doctorInformation != null) {
          setDoctorInfo(doctorInformation);
        }
      } catch (error) {
        console.error("Failed to fetch doctor's information:", error);
      }
    } 

    fillDoctorInfo();
  }, [doctorId]);  

  return (

    <div>
      {doctorInfo && (
      <div>
        <div className="Doctor-info-block">
          <img className="Doctor-info-img" src={doctor_face} alt="Italian Trulli"/>
          <div className="Doctor-info-text">
            <h1>Dr. {doctorInfo.firstName} {doctorInfo.lastName}, {doctorInfo.positionName}</h1>
            <p className="Doctor-info-text-small">{doctorInfo.experience} years experience</p>
            <h1>About me</h1>
            <p className="Doctor-info-text-small">{doctorInfo.description}</p>
          </div>
        </div>
        <div>
          <ScheduleViewer doctorId={doctorId}/>
        </div>
      </div>)
      }
    </div>


  );
};

export default DoctorSchedule;
