import React, { useState, useEffect } from 'react';
import { fetchDoctorInfo, fetchDoctorAppointments } from '../api/doctors'; // Mocked API functions for fetching doctor info and appointments
import { useParams } from 'react-router-dom';
import { ScheduleViewer } from '../components/doctor-schedule/ScheduleViewer';

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
          <h2>{`${doctorInfo.firstName} ${doctorInfo.lastName}'s Schedule`}</h2>
          <p>Email: {doctorInfo.email}</p>
          <p>Date of Birth: {doctorInfo.dateOfBirth}</p>
          <p>Position: {doctorInfo.positionName}</p>
        </div>
      )}

    <ScheduleViewer doctorId={doctorId}/>
    </div>

    
  );
};

export default DoctorSchedule;
