import React, {useEffect, useState} from "react";
import {BASE_URL, getAuthHeader, parseDate} from "../api/base";
import axios from "axios";
import doctor_face from "../images/doctor.png";

const UserInfo = () => {
  const [info, setInfo] = useState([]);
  const [disabledState, setDisabledState] = useState(true);

  const dateToJsFormat = (date) => {
    if (date == null) {
      date = "1000-10-10"
    }
    if (date.indexOf('-') !== -1) {
      return date
    }
    let day = date.substring(0, 2)
    let month = date.substring(2, 4)
    let year = date.substring(4, 8)

    return `${year}-${month}-${day}`
  }

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
    axios.get(request, {
      headers: getAuthHeader()
    }).then(info => {
      info.data.dateOfBirth = dateToJsFormat(info.data.dateOfBirth)
      setInfo(info.data)
    }).catch(() => {
      console.log("error")
    })
  }

  const updateDoctor = () => {
    setDisabledState(true)
    const request = `${BASE_URL}/doctors`
    const parsedDate = parseDate(info.dateOfBirth)
    axios.put(request, {
      "id": getUserId(),
      "firstName": info.firstName,
      "middleName": info.middleName,
      "lastName": info.lastName,
      "positionId": info.positionId,
      "description": info.description,
      "experience": info.experience,
      "email": info.email,
      "dateOfBirth": parsedDate
      }, {
        headers: getAuthHeader()
      }
    ).then(info => {
      info.data.dateOfBirth = dateToJsFormat(info.data.dateOfBirth)
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
          <input
            type="text"
            disabled={disabledState}
            value={info.firstName}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {firstName: `${e.target.value}`}))
            }}
          />
          <input
            type="text"
            disabled={disabledState}
            value={info.lastName}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {lastName: `${e.target.value}`}))
            }}
          />
          <input
            type="text"
            disabled={disabledState}
            value={info.middleName}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {middleName: `${e.target.value}`}))
            }}
          />
          <input
            type="text"
            disabled={disabledState}
            value={info.experience}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {experience: `${e.target.value}`}))
            }}
          />
          <input
            type="text"
            disabled={disabledState}
            value={info.description}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {description: `${e.target.value}`}))
            }}
          />
          <input
            type="text"
            disabled={disabledState}
            value={info.positionId}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {positionId: `${e.target.value}`}))
            }}
          />
          <input
            type="date"
            disabled={disabledState}
            value={info.dateOfBirth}
            onChange={(e) => {
              setInfo(Object.assign({}, info, {dateOfBirth: `${e.target.value}`}))
            }}
          />
          <button onClick={() => setDisabledState(false)}>Edit</button>
          <button onClick={() => updateDoctor()}>Save</button>
        </div>
      }

    </div>
  )
};

export default UserInfo