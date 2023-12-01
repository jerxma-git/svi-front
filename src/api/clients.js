import { BASE_URL, getAuthHeader } from "./base";
import axios from "axios";


export const fetchClientOwnAppointments = async () => {
    const clientId = localStorage.getItem("userId");
    const request = `${BASE_URL}/appointments/user/${clientId}`;
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
