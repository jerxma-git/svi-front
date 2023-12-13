import axios from "axios";
import { BASE_URL, getAuthHeader } from "./base";

export const fetchDoctorAppointments = async (doctorId, startDate, endDate, parse=true) => {
  const request = `${BASE_URL}/appointments/user/${doctorId}?startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = await axios.get(request, {
      headers: getAuthHeader()
    });
    return parse ? wrapByDate(response.data) : response.data;
  } catch(error) {
    // TODO handle error
    console.error("error fetching doctor appointments data", error);
    return null;
  }
};

const wrapByDate = (appointments) => {
  let wrapped = {};
  for (let appointment of appointments) {
    let [startTime, date] = appointment.startTime.split(" ");
    if (!(date in wrapped)) {
      wrapped[date] = [];
    }
    wrapped[date].push({
      "id": appointment.id,
      "date": date,
      "startTime": startTime,
      "status": appointment.status
    });
  }
  return wrapped;
}


const toDateStr = (date, sep) => {
  let dd = date.getDate().toString().padStart(2, '0');
  let mm = (date.getMonth() + 1).toString().padStart(2, '0');
  let yyyy = date.getFullYear().toString().padStart(4, '0');
  return `${dd}${sep}${mm}${sep}${yyyy}`;
}

export const toDashedDateStr = (date) => {
  return toDateStr(date, '-');
}

export const toSimpleDateStr = (date) => {
  return toDateStr(date, '');
}


export const fetchDoctorInfo = async (doctorId) => {
  const request = `${BASE_URL}/doctors/${doctorId}`;
  try {
    const response = await axios.get(request, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch(error) {
    // TODO handle error
    console.error("error fetching doctor info", error);
    return null;
  }
}

export const fetchDoctors = async () => {
  const request = `${BASE_URL}/doctors`;
  try {
    const response = await axios.get(request, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch(error) {
    // TODO handle error
    console.error("error fetching doctor info", error);
    return null;
  }
}