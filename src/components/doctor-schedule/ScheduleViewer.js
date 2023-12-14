import React, { useEffect, useState } from 'react';
import { ScheduleDay } from './ScheduleDay';
import { fetchDoctorAppointments, toDashedDateStr, toSimpleDateStr } from '../../api/doctors';
import { datePlusDays } from '../../api/datetime';
import app from "../../App";

const ScheduleViewer = ({doctorId}) => {
    const currentDate = new Date()

    const [wrappedSlots, setWrappedSlots] = useState({});
    const [dateRangeType, setDateRangeType] = useState("day");

    const [date, setDate] = useState("14122023")
    const [appointments, setAppointments] = useState(<ScheduleDay/>)

    useEffect(() => {
        console.log(date)
        getAppointments();
      }, [doctorId, date]);

    const getAppointments = () => {
      fetchDoctorAppointments(doctorId, date, date).then((appointments) => {
        console.log(appointments.data)
        setAppointments(<ScheduleDay date={date} slots={appointments.data}/>);
      }).catch(() => {
        console.log("here")
      })
    }

    return (
        <div>
          <form onSubmit={getAppointments}>
            <label>
              Day
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </form>
          <div>
            {appointments}
          </div>
        </div>
    );
}

export {ScheduleViewer}