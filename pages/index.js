import Head from "next/head";
import Header from "../components/Header.js";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import EventBus from "../common/EventBus";
import ArticleService from "../services/article.service.js";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import withAuth from "../common/AuthVerify.js";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/router.js";

const NewsWidget = dynamic(() => import("../components/NewsWidget"), {
  ssr: false,
});

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const router = useRouter();

  // Redux hooks
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch articles function
  const fetchArticles = async () => {
    try {
      const { data } = await ArticleService.fetchArticles();
      console.log(data);
      setNewsItems(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fetch products function
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

  useEffect(() => {
    fetchProducts();
    fetchArticles();

    // Fetch cart items from local storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Logout callback
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    // Subscribe to logout event
    EventBus.on("logout", logOut);

    // Unsubscribe from logout event on component unmount
    return () => {
      EventBus.remove("logout", logOut);
    };
  }, [logOut]);

  async function toggleFilter() {
    const breeds = currentUser.pets.map((pet) => pet.breed);
    try {
      if (filterActive) {
        const { data } = await ArticleService.fetchArticles();
        setArticles(data);
      } else {
        const { data } = await ArticleService.fetchArticlesByBreed(breeds);
        setArticles(data);
      }
      setFilterActive(!filterActive);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

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
      <main className="min-h-screen sm:p-8">
        <div>
          {/* News Feed */}
          <section className="rounded-lg">
            <div className="flex w-full justify-between mt-6">
              <h1 className="uppercase text-2xl font-bold p-3">Latest News</h1>
              <button
                onClick={toggleFilter}
                className="uppercase border-2 border-gray-300 text-sm text-gray-700 py-1 px-3 rounded-lg transition duration-300 ease-in-out hover:bg-[#1F1F1F] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {filterActive ? "Show All" : "For You"}
              </button>
            </div>
            <div className="flex flex-wrap -mx-2">
              {articles.length > 0
                ? articles.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className="w-full text-left mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                      onClick={() => {
                        router.push(`news/${item.id}`);
                      }}
                    >
                      <NewsWidget item={item} />
                    </button>
                  ))
                : newsItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className="w-full text-left mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                      onClick={() => {
                        router.push(`news/${item.id}`);
                      }}
                    >
                      <NewsWidget item={item} />
                    </button>
                  ))}
            </div>
          </section>
          <section>
            <h1 className="uppercase text-2xl font-bold p-3">New Arrivals</h1>
            <div className="sm:flex">
              <div className="w-full flex justify-center p-4">
                <div className="justify-center">
                  <ProductCard key={products[0]?.sku} item={products[0]} />
                </div>
              </div>
              <div className="w-full flex justify-center p-4">
                <div className="justify-center">
                  <ProductCard key={products[3]?.sku} item={products[3]} />
                </div>
              </div>
              <div className="w-full flex justify-center p-4">
                <div className="justify-center">
                  <ProductCard key={products[5]?.sku} item={products[5]} />
                </div>
              </div>
              <div className="w-full flex justify-center p-4">
                <div className="justify-center">
                  <ProductCard key={products[6]?.sku} item={products[6]} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default withAuth(Home);
