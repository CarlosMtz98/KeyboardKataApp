import config from "../config";
import axios from 'axios'

export const userService = {
    login,
    register,
    logout,
    getCurrentUser,
};

function login(email, password) {
    return axios
      .post(`${config.api.baseURL}/users/login`, {
        email,
        password
      })
      .then(response => {
          console.log(response.data)
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('accessToken', JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

function register(name, lastName, email, password) {
    return axios.post(`${config.api.baseURL}/users/signup`, {
      name, 
      lastName,
      email,
      password
    }).then(response => {
        console.log(response.data)
      if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('accessToken', JSON.stringify(response.data.token));
      }

      return response.data;
    })
  }

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
}