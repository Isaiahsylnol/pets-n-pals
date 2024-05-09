import React from "react";
import SignInForm from "../../components/SignInForm";
import Image from "next/image";

function login() {
  return (
    <div className="max-w-lg h-screen items-center justify-center mx-auto">
      <div className="justify-center w-96 flex mx-auto">
        <Image
          className="object-contain mt-20"
          alt="Logo Image"
          width={120}
          height={120}
          src={require("/assets/logo2.png")}
        />
      </div>
      <h1 className="pb-12 text-center font-medium text-3xl mt-8">Sign in</h1>
      <SignInForm />
    </div>
  );
}

export default login;
