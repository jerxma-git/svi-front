import { BASE_URL, getAuthHeader } from "./base";
import axios from "axios";


export const bookAppointment = async (appointment) => {
    let request = `${BASE_URL}/appointments`;
  
    // todo: rm
    if (!localStorage.getItem("userId")) {
        throw "rip bozo, no user";
    }

    try {
        console.log(`booking appointment ${appointment.id} for the client ${localStorage.getItem("userId")}`);
      const response = await axios.put(request, {
        "id": appointment.id,
        "clientId": localStorage.getItem("userId"),
        "status": "BOOKED",
      } ,{
        headers: getAuthHeader()
      });
      return response.data;
    } catch(error) {
      console.error("Couldn't book an appointment", error);
      return null;
    }
};