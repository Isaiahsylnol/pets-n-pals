import axios from "axios";

const createCart = (userId, status, total, products) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/create-cart`, {
    userId,
    status,
    total,
    products,
  });
};

const fetchCartById = async (userId) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/cart/fetchCart`,
      {
        userId,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { items: [] };
    } else {
      console.error("Error fetching cart:", error);
      throw error;
    }
  }
};

const CartService = {
  createCart,
  fetchCartById,
};

export default CartService;
