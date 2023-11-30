export const fetchDoctorAppointments = async (doctorId) => {
  return [
    {
    id: 1,
    clientInfo: {
      id: 3,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      middleName: 'Ivanovich',
      email: 'ivan@243gm3sdfail.com',
      dateOfBirth: '11.11.2001',
    },
    startTime: '2023-12-01 14:30',
    endTime: '2023-12-01 15:00',
  },
  ]
};
 
export const fetchDoctorInfo = async (doctorId) => {
  return {
    "id": 2,
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "middleName": "Ivanovich",
    "email": "iv23SDF4an@243gm3sdfail.com",
    "dateOfBirth": "11.11.2001",
    "positionId": 1,
    "positionName": "Surgeon"
    }
}