// Authentication service - (LOGIN, LOGOUT, REGISTER)

import axios from "axios";
const API_URL = "http://localhost:8080/api/users/";
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("cartInfo");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
