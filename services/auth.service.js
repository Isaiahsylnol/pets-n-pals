// Authentication service - (LOGIN, LOGOUT, REGISTER)

import axios from "axios";

const register = (username, email, password) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/users/signup`, {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_BACKEND}/api/users/signin`, {
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
