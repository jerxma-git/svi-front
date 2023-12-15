import React, { useState } from 'react';
import { bookAppointment } from '../../api/appointments';

const ScheduleSlot = ({slot}) => {

    // todo: rework into removing the slot from the ui (move the logic to ScheduleDay)
    const availabilityClass = {
        "AVAILABLE": "slot__available",
        "BOOKED": "slot__booked",
        "CLOSED": "slot__closed",
    };


    const handleClick = () => {
        let response = bookAppointment(slot);
        if (response === null) {
            alert("something went wrong");
            return;
        } 
        
        doSmthAfterSuccessfulBooking();

    }

    // todo: rm
    function doSmthAfterSuccessfulBooking() {
        setBooked(true);
    }

    const [booked, setBooked] = useState(slot.status !== "AVAILABLE");



    return (
        <div className={"slot " + availabilityClass[slot.status]} onClick={handleClick}>
            <p>{slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}</p>
            
            <p>{slot.status}</p>
            {booked && <span> booked:) </span>}
        </div>
    )
} 

export {ScheduleSlot}