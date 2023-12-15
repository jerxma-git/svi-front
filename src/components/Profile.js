import React, {useState} from "react";
import UserInfo from "./UserInfo";
import UserAppointments from "./UserAppointments";

const Profile = () => {
  const [location, setLocation] = useState('info')

  return (
    <div className="Profile-block">
      <div className="Profile-tab">
        <button className="Profile-button" onClick={() => setLocation('appointments')}>My appointments</button>
        <button className="Profile-button" onClick={() => setLocation('info')}>Personal information</button>
      </div>
      <div className="Profile-block-delimiter"></div>
        {location === 'appointments' &&
            <UserAppointments/>
        }
        {location === 'info' &&
            <UserInfo/>
        }
    </div>
  );
};

export default Profile