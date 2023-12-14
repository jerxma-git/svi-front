import React from 'react';

const ScheduleSlot = ({slot}) => {
    const availabilityClass = {
        "AVAILABLE": "slot__available",
        "RESERVED": "slot__reserved",
        "CLOSED": "slot__closed",
    };

    return (
        <div className={"slot " + availabilityClass[slot.status]} >
            <p>{slot.startTime.su} - {slot.endTime}</p>
        </div>
    )
} 

export {ScheduleSlot}