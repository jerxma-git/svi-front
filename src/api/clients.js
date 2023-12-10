import { BASE_URL, getAuthHeader } from "./base";
import axios from "axios";

// current format: "YYYYMMDD"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

export const fetchClientOwnAppointments = async (startDate, endDate) => {
    const clientId = localStorage.getItem("userId");
    let request = `${BASE_URL}/appointments/user/${clientId}`;

    if (startDate && endDate) {
      const start = formatDate(startDate);
      const end = formatDate(endDate);
      request += `?startDate=${start}&endDate=${end}`;
    }

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
