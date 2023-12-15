import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader} from "../api/base";
import axios from "axios";
import doctor_face from "../images/doctor.png";

const UserInfo = () => {
  const [info, setInfo] = useState([]);

  const getRole = () => {
    return localStorage.getItem("role")
  }

  const getUserId = () => {
    return localStorage.getItem("userId")
  }

  useEffect(() => {
    getInfo()
  }, []);

  const getInfo = () => {
    const request = `${BASE_URL}/${getRole().toLocaleLowerCase()}s/${getUserId()}`;
    console.log(request)
    axios.get(request, {
      headers: getAuthHeader()
    }).then(info => {
      console.log(info.data)
      setInfo(info.data)
    }).catch(() => {
      console.log("error")
    })
  }

  return (
    <div>
      {getRole() === 'CLIENT' &&
        <div>
          <img src={doctor_face} alt="Italian Trulli" width="200" height="200"/>
          <p>First name: {info.firstName}</p>
          <p>Last name: {info.lastName}</p>
          <p>Middle name: {info.middleName}</p>
          <p>Date of birth: {info.dateOfBirth}</p>
        </div>
      }
      {getRole() === 'DOCTOR' &&
        <div>
          <img src={doctor_face} alt="Italian Trulli" width="200" height="200"/>
          <p>First name: {info.firstName}</p>
          <p>Last name: {info.lastName}</p>
          <p>Middle name: {info.middleName}</p>
          <p>Experience: {info.experience}</p>
          <p>My description: {info.description}</p>
          <p>Position: {info.positionName}</p>
          <p>Date of birth: {info.dateOfBirth}</p>
        </div>
      }

    </div>
  )
};

export default UserInfo