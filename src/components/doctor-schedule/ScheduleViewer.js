import React, { useEffect, useState } from 'react';
import { ScheduleDay } from './ScheduleDay';
import {
  fetchDoctorAppointments,
  fetchDoctorAppointmentsByStatus,
  toHTMLInputDateValueStr,
  toSimpleDateStr
} from '../../api/doctors';
import {datePlusDays} from "../../api/datetime";

const ScheduleViewer = ({doctorId}) => {

  const [slots, setSlots] = useState([]);
  // const [dateRangeType, setDateRangeType] = useState("day");

  const DEFAULT_DATE_RANGE = {
      "start": new Date(), // today
      "end": datePlusDays(new Date(), 1), // tomorrow
  }


  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const startDate = toSimpleDateStr(dateRange.start);
          const endDate = toSimpleDateStr(dateRange.end);
          // assuming endDate == startDate + 1
          const appointments = await fetchDoctorAppointmentsByStatus(doctorId, startDate, startDate, 'AVAILABLE', false) ?? [];
          setSlots(appointments);
        } catch (error) {
          console.error("Error fetching doctor's schedule:", error);
        }
      };
      
      fetchData();
    }, [doctorId, dateRange]);


  const handleCalendarInput = (dateValue) => {
    const startDate = new Date(dateValue);
    const endDate = datePlusDays(startDate, 1);
    setDateRange({
      "start": startDate,
      "end": endDate
    });
  }

  // const getCurrentWeekRange = () => {
  //     let monday = new Date();
  //     monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7); 
  //     return {
  //         "start": monday,
  //         "end": datePlusDays(monday, 7)
  //     }
  // }

  // const toggleMode = () => {
  //     if (dateRangeType === "day") {
  //         setDateRangeType("week");
  //         setDateRange(getCurrentWeekRange());
  //     } else {
  //         setDateRangeType("day");
  //         setDateRange(DEFAULT_DATE_RANGE);
  //     }
  // }

  return (
      <div className="Doctor-schedule-viewer">
        <div className="Doctor-schedule-viewer-head">
          <h2>Available slots</h2>
          <input className="Available-slots-calendar"  type="date" value={toHTMLInputDateValueStr(dateRange.start)} onChange={(e) => handleCalendarInput(e.target.value)}></input>
        </div>
        { slots.length !== 0 &&
          <ScheduleDay date={dateRange.start} slots={slots}/>
        }
        { slots.length === 0 &&
          <p>No available slots for today</p>
        }
      </div>
  );
}

export {ScheduleViewer}