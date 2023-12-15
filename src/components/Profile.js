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
      <div className="User-appointments-block">
        {location === 'appointments' &&
          <div className="User-appointments-block">
            <UserAppointments/>
          </div>
        }
        {location === 'info' &&
          <div>
            <UserInfo/>
          </div>
        }
      </div>
    </div>
  );
};

export default Profile