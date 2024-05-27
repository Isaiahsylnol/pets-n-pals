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
      <main className="min-h-screen sm:p-8 max-w-7xl mx-auto">
        <div>
          {/* News Feed */}
          <section>
            <div className="flex w-full justify-between mt-6">
              <h1 className="uppercase text-2xl font-bold p-3">Latest News</h1>
              <button
                onClick={toggleFilter}
                className="uppercase border border-gray-600 text-sm text-gray-700 px-3 h-12 rounded-lg transition duration-300 ease-in-out hover:bg-[#1F1F1F] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {filterActive ? "Show All" : "For You"}
              </button>
            </div>
            <div>
              {newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className="w-full sm:w-1/2 md:w-2/4 lg:w-1/3 mb-4"
                    onClick={() => router.push(`news/${item.id}`)}
                  >
                    <NewsWidget item={item} />
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-700">
                  No news available at the moment.
                </p>
              )}
            </div>
          </section>
          {/* New Product Arrivals */}
          <section>
            <h1 className="uppercase text-2xl font-bold p-3">New Arrivals</h1>
            <div className="sm:flex flex-wrap -mx-3">
              {products.slice(0, 4).map((product) => (
                <div className="w-full sm:w-1/2 lg:w-1/4 p-4" key={product.sku}>
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
