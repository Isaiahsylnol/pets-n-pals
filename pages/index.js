import Head from "next/head";
import Header from "../components/Header";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import EventBus from "../common/EventBus";
import ArticleService from "../services/article.service";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import withAuth from "../common/AuthVerify";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/router";
import { ParkMap } from "../components/ParkMap";

const NewsWidget = dynamic(() => import("../components/NewsWidget"), {
  ssr: false,
});

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      const { data } = await ArticleService.fetchArticlesByBreed(["any"]);
      setNewsItems(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/product`
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch cart items from local storage
  const fetchCartItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchArticles();
    fetchCartItems();
  }, []);

  // Handle user logout
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", logOut);
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, [logOut]);

  // Toggle filter for articles based on pet breeds
  const toggleFilter = async () => {
    const breeds = currentUser.pets.map((pet) => pet.breed);
    try {
      if (filterActive) {
        const { data } = await ArticleService.fetchArticlesByBreed(["any"]);
        setNewsItems(data);
      } else {
        const { data } = await ArticleService.fetchArticlesByBreed(breeds);
        setNewsItems(data);
      }
      setFilterActive(!filterActive);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="The home page containing all the latest news and tips for pet owners."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={cartItems.length} />
      <main className="min-h-screen sm:p-3 max-w-7xl mx-auto">
        <div>
          {/* News Feed */}
          <section>
            <div className="flex w-full justify-between mt-6">
              <h1 className="uppercase text-2xl font-bold p-3">Latest News</h1>
              <button
                onClick={toggleFilter}
                className="uppercase m-3 border border-gray-600 text-[10px] text-gray-700 px-2 h-8 rounded-lg transition duration-300 ease-in-out hover:bg-[#1F1F1F] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {filterActive ? "Show All" : "Curated feed"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-fit items-center mx-auto"
                    onClick={() => router.push(`news/${item.id}`)}
                  >
                    <NewsWidget item={item} />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700 col-span-full">
                  No news available at the moment.
                </p>
              )}
            </div>
          </section>
          <ParkMap />
          {/* New Product Arrivals */}
          <section>
            <h1 className="uppercase text-md font-bold p-4 -mb-5">
              New Arrivals
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <div className="w-full p-4" key={product.sku}>
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default withAuth(Home);
