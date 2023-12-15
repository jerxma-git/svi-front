import React, { useState } from 'react';
import { bookAppointment } from '../../api/appointments';
import {getRoles} from "@testing-library/react";

const ScheduleSlot = ({slot}) => {
    // todo: rework into removing the slot from the ui (move the logic to ScheduleDay)
    const availabilityClass = {
        "default": "slot__available",
        "just_booked": "slot__booked",
    };

    const getRole = () => {
        return localStorage.getItem("role")
    }


    const handleClick = (event) => {
        if (getRole() === "DOCTOR") {
            alert("Please, log in as client to book appointments")
            return;
        }
        let response = bookAppointment(slot);
        if (response === null) {
            alert("something went wrong");
            return;
        } 
        console.log("booked :))");
        console.log(this);
        event.currentTarget.classList.remove(availabilityClass["default"]);
        event.currentTarget.classList.add(availabilityClass["just_booked"]);
        event.currentTarget.removeAttribute("onClick");
    }

    return (
        <div className={"Doctor-schedule-viewer-day-slot " + availabilityClass["default"]} onClick={handleClick}>
            <span>{slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}</span>            
        </div>
    )
} 

export {ScheduleSlot}