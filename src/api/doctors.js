import axios from "axios";
import { BASE_URL, getAuthHeader } from "./base";

export const fetchDoctorAppointments = async (doctorId) => {
  const request = `${BASE_URL}/appointments/user/${doctorId}`;
  try {
    const response = await axios.get(request, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch(error) {
    // TODO handle error
    console.error("error fetching doctor appointments data", error);
    return null;
  }
};

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