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
        <div>
          <img src={doctor_face} alt="Italian Trulli" width="400" height="400"/>
          <h2>Dr. {doctorInfo.firstName} {doctorInfo.lastName}, {doctorInfo.positionName}</h2>
          <p>{doctorInfo.experience} years experience</p>
          <h2>About me</h2>
          <p>{doctorInfo.description}</p>
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
