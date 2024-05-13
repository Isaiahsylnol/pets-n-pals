import Head from "next/head";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import PetCard from "../components/PetCard.js";
import { useSelector } from "react-redux";
import CreatePetModal from "../components/Modal/CreatePetModal.js";
import ModalService from "../components/Modal/services/ModalService.js";
import React, { useEffect, useState } from "react";

export default function ManagePets() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState();

  const addModal = (modal) => {
    ModalService.open(modal);
  };

  useEffect(() => {
    setUser(currentUser);
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, [currentUser]);

  return (
    <div className="justify-center w-full">
      <Head>
        <title>Manage Pets</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Manage your registered pet's information."
        />
      </Head>
      <Header countCartItems={cartItems.length} />
      <main className="min-h-screen flex items-center justify-center mt-16 sm:mt-0">
        <div className="w-full max-w-2xl">
          <button
            onClick={() => addModal(CreatePetModal)}
            className="flex bg-orange-400 hover:bg-orange-500 p-6 w-5/6 mx-auto justify-center text-lg font-semibold text-white uppercase rounded-2xl"
          >
            Create Pet
          </button>
          {user?.pets?.map((pet) => {
            return (
              <li
                key={pet._id}
                className="p-5 rounded-xl h-min"
                style={{ listStyle: "none" }}
              >
                {
                  <PetCard
                    data={pet}
                    image={require("/assets/default_pet_profile.png")}
                    alt="Default pet profile"
                  />
                }
              </li>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
