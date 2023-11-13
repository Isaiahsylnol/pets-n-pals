import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header.js";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/products`,
        {
          cache: "no-store",
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error setting products:", error);
      }
    };

    fetchData();
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
        <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 justify-center mt-10 mb-5">
          {products?.data?.map((item) => {
            return <ProductCard key={item.sku} item={item} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
