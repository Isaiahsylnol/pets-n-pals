import Head from "next/head";
import Header from "../components/Header.js";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import EventBus from "../common/EventBus";
import PetService from "../services/pet.service";
import dynamic from "next/dynamic";
import Footer from "../components/Footer";
import withAuth from "../common/AuthVerify.js";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const NewsWidget = dynamic(() => import("../components/NewsWidget"), {
  ssr: false,
});

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [newsItems, setItems] = useState();
  const [products, setProducts] = useState([]);
  let feed = PetService.curatedPetFeed(currentUser?.pets);
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const fetchProducts = async () => {
    const result = await axios(`${process.env.NEXT_PUBLIC_BACKEND}/products`);
    setProducts(result.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setItems(feed);
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, [currentUser]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);
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
      <main className="min-h-screen">
        {/* Shop items - Flex Grid */}
        <div>
          {/* News Feed */}
          <section className="rounded-lg">
            <h1 className="uppercase text-2xl font-semibold p-3">
              Latest News
            </h1>
            <div className="flex flex-wrap">
              {newsItems?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-full mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                  >
                    <a href={"news/" + item.id}>
                      <NewsWidget item={item} />
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="mt-8">
            <h1 className="uppercase text-2xl font-semibold p-3">
              New Arrivals
            </h1>
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
