import React from 'react';

const ScheduleSlot = ({slot}) => {
    const availabilityClass = {
        "AVAILABLE": "slot__available",
        "RESERVED": "slot__reserved",
        "CLOSED": "slot__closed",
    };

    return (
        <div className={"slot " + availabilityClass[slot.status]} >
            <span>{slot.startTime} </span>
            
            {/* todo: remove, add color*/}
            <span>{slot.status}</span> 

        </div>
    )
} 

export {ScheduleSlot}