import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className="sm:grid sm:grid-cols-1 md:grid-cols-3 gap-12 w-5/6 max-w-3xl">
        <div className="flex justify-center">
          <Image
            className="object-contain"
            alt="Logo Image"
            width={250}
            height={250}
            src={require("/assets/logo2.png")}
          />
        </div>

        <div className="flex flex-col items-center sm:items-start col-span-2">
          <h1 className="text-3xl font-bold mb-3 mt-7">Join our community</h1>
          <p className="leading-relaxed text-base mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis on proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
          <div className="flex gap-9 w-full pt-8">
            <button
              type="button"
              onClick={() => router.push("/account/register")}
              className="bg-orange-500 text-center hover:bg-orange-700 w-full justify-center py-2 rounded-2xl transition duration-300 ease-in-out hover:text-white"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => router.push("/account/login")}
              className="bg-orange-500 text-center hover:bg-orange-700 w-full justify-center py-2 rounded-2xl transition duration-300 ease-in-out hover:text-white"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
