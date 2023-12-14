import axios from "axios";

const BASE_URL = "http://localhost:8080";

function getAuthHeader() {
  let authkey = localStorage.getItem("authkey");

  return {
    "Authorization": `Basic ${authkey}`
  }
}

export function isAuthenticate() {
  const authKey = localStorage.getItem("authkey")
  return authKey != null
}


async function authenticate(credentials) {
  const request = `${BASE_URL}/users/login`;
  return axios.post(request, {
    "email": credentials.username,
    "password": credentials.password
  });
}

async function register(credentials) {
  const request = `${BASE_URL}/users/register`

  return axios.post(request, {
    "email": credentials.username,
    "password": credentials.password,
    "firstName": credentials.firstName,
    "lastName": credentials.lastName,
    "middleName": credentials.middleName,
    "dateOfBirth": parseDate(credentials.dateOfBirth),
    "role": credentials.role
  });
}

export function parseDate(date) {
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)
  return `${day}${month}${year}`
}

export function logOut() {
  localStorage.removeItem("userId")
  localStorage.removeItem("username")
  localStorage.removeItem("password")
  localStorage.removeItem("authkey")
  localStorage.removeItem("role")
}

export {getAuthHeader, authenticate, register, BASE_URL}