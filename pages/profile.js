import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header.js";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import {
  PhoneIcon,
  ExclamationIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import Login from "./login-register";

export default function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(currentUser);
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, [currentUser]);

  if (user) {
    return (
      <div className="justify-center w-full">
        <Head>
          <title>Profile</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="The profile page containing settings and user information."
          />
        </Head>
        <Header countCartItems={cartItems.length} />
        <main className="grid-cols-1 h-screen mx-auto sm:flex justify-center gap-6 p-11 md:grid-cols-2 lg:grid-cols-2">
          {/* User profile widget - START */}
          <div className="h-min w-full sm:w-3/4 lg:w-2/5 rounded-xl border-2 border-gray-300 bg-gray-100 p-6 text-6xl max-w-lg">
            {/* Edit User Profile Button - START */}
            <div className="w-full float-right">
              <button className="h-11 text-base float-right rounded py-2 px-4 font-bold hover:text-orange-500">
                Edit
              </button>
            </div>
            {/* Edit User Profile Button  - END*/}
            <div className="w-full p-6 text-base">
              <p className="text-2xl font-bold mb-2">{user?.username}</p>
              <p>{user?.address}</p>
              <p>Toronto, Canada</p>
              <p>222-333-4444</p>
              <p>{user?.email}</p>
              <p>{user?.account_type}</p>
              <div className="mt-10 grid grid-cols-1 gap-2 text-white w-44">
                <button className="h-10 rounded bg-yellow-500 font-bold hover:bg-yellow-600">
                  <PhoneIcon className="inline h-6" />
                  <a className="ml-3">Support</a>
                </button>
                <button className="h-10 rounded bg-blue-500 font-bold hover:bg-blue-600">
                  <ViewGridIcon className="inline h-6" />
                  <a className="ml-3">Manage Plan</a>
                </button>
                <button className="h-10 rounded bg-red-500 font-bold hover:bg-red-600">
                  <ExclamationIcon className="inline h-6" />
                  <a className="ml-3">Deactivate</a>
                </button>
              </div>
            </div>
          </div>
          {/* grid nested  */}
          <div className="w-full max-w-xl">
            {user?.pets?.map((pet) => {
              return (
                <div className="bg-slate-500 p-4 text-white rounded-xl mt-6 sm:m-5">
                  <div className="flex p-2 gap-5 items-center">
                    <Image
                      src={require("/assets/default_pet_profile.png")}
                      alt="Pet thumbnail"
                      width={72}
                      height={76}
                    />
                    <h2 className="font-semibold text-xl">{pet.name}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return <Login />;
}
