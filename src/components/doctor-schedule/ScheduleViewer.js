import React, { useEffect, useState } from 'react';
import { ScheduleDay } from './ScheduleDay';
import { fetchDoctorAppointments, toDashedDateStr, toSimpleDateStr } from '../../api/doctors';
import {parseDate} from "../../api/base";

const ScheduleViewer = ({doctorId}) => {
    const [date, setDate] = useState("2023-12-14")
    const [appointments, setAppointments] = useState(<ScheduleDay/>)

    useEffect(() => {
        getAppointments();
      }, [doctorId, date]);

    const getAppointments = () => {
      let parsedDate = parseDate(date)
      fetchDoctorAppointments(doctorId, parsedDate, parsedDate).then((appointments) => {
        console.log(appointments.data)
        setAppointments(<ScheduleDay date={date} slots={appointments.data}/>);
      }).catch(() => {
        console.error("here")
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