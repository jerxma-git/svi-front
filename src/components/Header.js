import Navbar from './Navbar';
import {isAuthenticate, logOut} from "../api/base";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const username = localStorage.getItem("username");

  let navigate = useNavigate()

  function onLogOut() {
    logOut()
    navigate('/login')
  }

  return (
    <header className="App-header">
      <h1 className="App-name">Doctor Appointment Service</h1>
        <div className="App-header-info">
          <Navbar/>
          { isAuthenticate() &&
            <div className="App-user-icon">
              <p className="App-user-name">{username}</p>
            </div>
          }
          { isAuthenticate() &&
              <button className="App-logout-button" onClick={onLogOut}>Log out</button>
          }
        </div>
    </header>
  );
};

export default Header;