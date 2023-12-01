import axios from "axios";


const BASE_URL = "http://localhost:8080";

function getAuthHeader() {
    
    let authkey = localStorage.getItem("authkey");
    if (authkey === null) {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        authkey = window.btoa(`${username}:${password}`);
    }
    
    return  {
        "Authorization": `Basic ${authkey}` 
    }
}


async function authenticate(credentials) {
    const request = `${BASE_URL}/users/login`;
    return axios.post(request, {
        "email": credentials.username,
        "password": credentials.password
    });
}

export {getAuthHeader, authenticate, BASE_URL} 