import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header.js";
import { useSelector } from "react-redux";
import Footer from "../components/Footer.js";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";
import SubscribeContainer from "../components/Subscriptions/Container.js";

export default function Subscriptions() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const {
    auth: { user: currentUser },
  } = useSelector((state) => state);
  const [user, setUser] = useState();
  const countCartItems = cartItems?.length ?? 0;

  const setUserCallback = useCallback(
    () => setUser(currentUser),
    [currentUser]
  );
  useEffect(setUserCallback, [setUserCallback]);

  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <meta
          name="description"
          content="Choose between a basic and premium subscription plan."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header countCartItems={countCartItems} />
      <main className="min-h-screen">
        <div className="w-full p-12">
          <h1 className="text-3xl text-center font-bold pb-16">
            Choose the plan that's right for you.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 mx-auto lg:max-w-4xl gap-20">
            <SubscribeContainer
              tier="Basic"
              priceId="price_1MpWbCBNWulKDnZkdaeb0CgC"
              price="$0.00/month"
              description="Ideal for individuals interested in the latest healthcare tips and news concerning pets."
            >
              <div className="w-full flex">
                <CheckIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Register 2 Pets</h3>
              </div>
              <div className="w-full flex">
                <MinusIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Gift Box</h3>
              </div>
              <div className="w-full flex">
                <MinusIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Pet Life Magazine</h3>
              </div>
              <div className="w-full flex">
                <MinusIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Pet Food Basket</h3>
              </div>
            </SubscribeContainer>
            <SubscribeContainer
              tier="Premium"
              priceId="price_1MpWZ9BNWulKDnZkzpsoMhYA"
              price="$23.99/month"
              description="Ideal for individuals who want the latest healthcare tips, news, treats & swag geared towards their pet."
            >
              <div className="w-full flex">
                <CheckIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Register more than 2 Pets</h3>
              </div>
              <div className="w-full flex">
                <CheckIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Gift Box</h3>
              </div>
              <div className="w-full flex">
                <CheckIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Pet Life Magazine</h3>
              </div>
              <div className="w-full flex">
                <CheckIcon className="h-6 w-6 ml-5" />
                <h3 className="pl-4">Pet Food Basket</h3>
              </div>
            </SubscribeContainer>
          </div>
          {user ? null : (
            <div className="bg-white mt-16 p-6 rounded-lg text-center">
              <h2 className="text-2xl font-semibold mb-4">Join Us Today!</h2>
              <p className="mb-6 text-gray-700">
                Sign up now to access exclusive subscription plans and enjoy all
                the benefits we offer.
              </p>
              <a href="/login-register">
                <button
                  type="button"
                  className="text-white bg-orange-400 hover:bg-[#1F1F1F] font-medium rounded-full text-sm px-8 py-4"
                >
                  Sign Up
                </button>
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
