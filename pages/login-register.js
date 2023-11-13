import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import LoginModal from "../components/Modal/SignInModal";
import ModalService from "../components/Modal/services/ModalService";
import { clearMessage } from "../slices/message";
import SignUpModal from "../components/Modal/SignUpModal";

export default function Login() {
  const addModal = (modal) => {
    ModalService.open(modal);
  };

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div>
      <main className={styles.main}>
        <section className="text-gray-600 lg:flex items-center gap-10 p-8">
          <div className="flex flex-col justify-center items-center">
            <Image
              className="object-contain"
              alt="Logo Image"
              width={250}
              height={250}
              src={require("/assets/logo2.png")}
            />
          </div>
          <div className="flex flex-col max-w-xl items-center lg:items-start">
            <h1 className="text-3xl font-bold mb-3 mt-7">Join our community</h1>
            <p className="leading-relaxed text-base mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis on proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <a
              onClick={() => addModal(SignUpModal)}
              className="text-center text-white bg-orange-500 py-1 px-4 mt-10 mb-5 hover:bg-indigo-600 rounded cursor-pointer w-60"
            >
              Sign up
            </a>

            <a
              onClick={() => addModal(LoginModal)}
              className="text-center text-white bg-orange-500 mb-4 py-1 px-4 hover:bg-indigo-600 rounded cursor-pointer w-60"
            >
              Sign in
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
