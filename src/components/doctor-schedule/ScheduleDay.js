import React from 'react';
import {ScheduleSlot} from './ScheduleSlot';

const ScheduleDay = ({slots}) => {
  const DISPLAYED_STATUSES = new Set(["AVAILABLE"]);

  return (
    <ul className="Doctor-schedule-viewer-day">
      {slots.filter(slot => DISPLAYED_STATUSES.has(slot.status)).map(slot => <li key={slot.id}><ScheduleSlot slot={slot}/></li>)}
    </ul>
  );
}

export {ScheduleDay}