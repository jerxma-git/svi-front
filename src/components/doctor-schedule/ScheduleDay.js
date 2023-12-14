import React from 'react';
import { ScheduleSlot } from './ScheduleSlot';

const ScheduleDay = ({date, slots}) => {
    return (
        <div>
          <p>im here</p>
            <p>{date}</p>
            <ul>
                {slots?.map(slot => <li key={slot.id}><ScheduleSlot slot={slot}/></li>)}
            </ul>
            
        </div>
    );
}

export {ScheduleDay}