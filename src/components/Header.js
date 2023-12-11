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
    <header>
      <h1>Doctor Appointment Service</h1>
      <Navbar/>
      <p>Logged in as {username}</p>
      { isAuthenticate() &&
        <button onClick={onLogOut}>Log out</button>
      }
    </header>
  );
};

export default Header;