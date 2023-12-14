import React, {useState} from "react";
import UserInfo from "./UserInfo";
import UserAppointments from "./UserAppointments";

const Profile = () => {
  const [location, setLocation] = useState('info')

  return (
    <div>
      <div>
        <button onClick={() => setLocation('appointments')}>My appointments</button>
        <button onClick={() => setLocation('info')}>Personal information</button>
      </div>
      <div>
        {location === 'appointments' &&
          <div>
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