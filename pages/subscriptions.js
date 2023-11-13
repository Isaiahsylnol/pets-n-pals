import React, { useCallback, useEffect, useMemo, useState } from "react";
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
          <div className="flex items-center justify-center flex-wrap p-7 gap-16">
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
            <a href="/login-register">
              <button
                type="button"
                className="text-white bg-orange-400 hover:bg-[#1F1F1F] font-medium rounded-full text-sm px-8 py-4 text-center mr-2 mb-2"
              >
                Sign Up
              </button>
            </a>
          )}
          <div className="mt-8 text-center">
            <span>
              See{" "}
              <a
                href="/terms"
                target="_blank"
                aria-hidden="false"
                className="text-orange-500"
              >
                Terms & Conditions
              </a>{" "}
              for full details. Prepaid monthly, non-refundable, automatically
              renews monthly.
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
