import React from 'react';

const ScheduleSlot = ({slot}) => {
    const availabilityClass = {
        "AVAILABLE": "slot__available",
        "RESERVED": "slot__reserved",
        "CLOSED": "slot__closed",
    };

    return (
        <div className={"slot " + availabilityClass[slot.status]} >
            <p>{slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}</p>
        </div>
    )
} 

export {ScheduleSlot}