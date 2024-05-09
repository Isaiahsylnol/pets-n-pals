import axios from "axios";
const API_URL = "http://localhost:8080/api/cart/";

const createCart = (userId, status, total, products) => {
  return axios.post(API_URL + "create-cart", {
    userId,
    status,
    total,
    products,
  });
};

const fetchCartById = (userId) => {
  return axios.post(API_URL + "fetchCart", {
    userId,
  });
};

const CartService = {
  createCart,
  fetchCartById,
};

export default CartService;
