import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header.js";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import CartService from "../services/cart.service.js";

export default function Shop() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  const fetchProducts = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/product`
      );
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function getUserCart() {
    try {
      const response = await CartService.fetchCartById(currentUser?.id);
      if (response.status != 200) {
        return;
      }
      const data = await response.data;
      // Successful response
      console.log("Cart:", data);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      if (error.message.includes("404")) {
        console.log("Cart not found");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, []);
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Various products for purchase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={cartItems?.length} />
      <main className="min-h-screen">
        {/* Shop items - Flex Grid */}
        <div className="mx-auto max-w-7xl p-8 m-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((item) => {
            return <ProductCard key={item.sku} item={item} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
