import axios from "axios";
const API_URL = "http://localhost:8080/api/cart/create-cart";

const createCart = (userId, status, total, products) => {
  return axios.post(API_URL, {
    userId,
    status,
    total,
    products,
  });
};

const CartService = {
  createCart,
};

export default CartService;
