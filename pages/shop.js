import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCartItems = () => {
      const storedCartItems = localStorage.getItem("cartItems");
      setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
    };

    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/product`
        );
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCartItems();
    fetchProducts();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Various products for purchase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={cartItems.length} />
      <main className="min-h-screen">
        <div className="max-w-7xl mt-8 mx-auto p-4 gap-7 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <React.Fragment key={item.sku}>
              <ProductCard item={item} />
              <hr className="mt-6 mb-6 border-1 sm:hidden border-gray-400" />
            </React.Fragment>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
