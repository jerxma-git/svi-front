import React from 'react';
import {ScheduleSlot} from './ScheduleSlot';

const ScheduleDay = ({slots}) => {
  return (
    <div>
      <ul>
        {slots?.map(slot => <li key={slot.id}><ScheduleSlot slot={slot}/></li>)}
      </ul>
    </div>
  );
}

export {ScheduleDay}