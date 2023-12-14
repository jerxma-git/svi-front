import Navbar from './Navbar';
import {isAuthenticate, logOut} from "../api/base";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  let navigate = useNavigate()

  function onLogOut() {
    logOut()
    navigate('/login')
  }

  function toProfile() {
    navigate(`/profile/${userId}`)
  }

  return (
    <header className="App-header">
      <h1 className="App-name">Doctor Appointment Service</h1>
        <div className="App-header-info">
          <Navbar/>
          { isAuthenticate() &&
            <button onClick={toProfile} className="App-user-icon">
              <p className="App-user-name">{username}</p>
            </button>
          }
          { isAuthenticate() &&
              <button className="App-logout-button" onClick={onLogOut}>Log out</button>
          }
        </div>
    </header>
  );
};

export default Header;