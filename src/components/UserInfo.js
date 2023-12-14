import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader} from "../api/base";
import axios from "axios";
import doctor_face from "../images/doctor.png";

const UserInfo = () => {
  const [info, setInfo] = useState([]);

  const getRole = () => {
    return localStorage.getItem("role")
  }

  useEffect(() => {
    getAppointments()
  }, []);

  const getAppointments = () => {
    const request = `${BASE_URL}/${getRole().toLocaleLowerCase()}s`;
    axios.get(request, {
      headers: getAuthHeader()
    }).then( info => {
      setInfo(info.data)
    }).catch(() => {
      console.log("error")
    })
  }

  return (
    <div>
      <div>

      </div>
      <div>

      </div>
      <img src={doctor_face} alt="Italian Trulli" width="200" height="200"/>
      <p>{info.firstName}</p>
      <p>{info.lastName}</p>
      <p>{info.middleName}</p>
      <p>{info.middleName}</p>
    </div>
  )
};

export default UserInfo