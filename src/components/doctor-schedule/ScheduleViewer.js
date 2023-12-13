import React, { useEffect, useState } from 'react';
import { ScheduleDay } from './ScheduleDay';
import { fetchDoctorAppointments, toDashedDateStr, toSimpleDateStr } from '../../api/doctors';
import { datePlusDays } from '../../api/datetime';

const ScheduleViewer = ({doctorId}) => {

    const [wrappedSlots, setWrappedSlots] = useState({});
    const [dateRangeType, setDateRangeType] = useState("day");

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
            const appointments = await fetchDoctorAppointments(doctorId, startDate, endDate);

            setWrappedSlots(appointments);
          } catch (error) {
            console.error("Error fetching doctor's schedule:", error);
          }
        };
        
        fetchData();
      }, [doctorId, dateRange]);


    const getCurrentWeekRange = () => {
        let monday = new Date();
        monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7); 
        return {
            "start": monday,
            "end": datePlusDays(monday, 7)
        }
    }

    const toggleMode = () => {
        if (dateRangeType === "day") {
            setDateRangeType("week");
            setDateRange(getCurrentWeekRange());
        } else {
            setDateRangeType("day");
            setDateRange(DEFAULT_DATE_RANGE);
        }
    }

    return (
        <div>
            <button onClick={toggleMode}>toggle</button>
            {(() => {
                switch (dateRangeType) {
                case 'day':
                    let slots = wrappedSlots[toDashedDateStr(dateRange.start)] ?? [];
                    return <ScheduleDay date={dateRange.start} slots={slots}/>;
                case 'week':
                    return (
                    <div>
                        {[...Array(7)].map((_, index) => datePlusDays(dateRange.start, index)).map((date, index) => {
                            return <ScheduleDay key={index} date={date} slots={wrappedSlots[toDashedDateStr(date)] ?? []} />;
                        })}
                    </div>
                    );
                default:
                    return "";
                }
            })()}
        </div>
    );
}

export {ScheduleViewer}