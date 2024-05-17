import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import * as Yup from "yup";
import { login } from "../../slices/auth";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Enter your username"),
    password: Yup.string().required("Enter your password"),
  });

  const handleSubmit = (formValue) => {
    const { username, password } = formValue;
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch(() => {});
  };

  return (
    <div className="max-w-lg h-screen flex flex-col mx-auto">
      <div className="w-96 flex justify-center mx-auto">
        <Image
          className="object-contain mt-24"
          alt="Logo Image"
          width={120}
          height={120}
          src={require("/assets/logo2.png")}
        />
      </div>
      <h1 className="pb-12 text-center font-medium text-3xl mt-8">Sign in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="p-5 w-full">
          <div>
            <label htmlFor="username" className="block font-semibold">
              Username
            </label>
            <Field
              name="username"
              type="text"
              className="bg-[#f2f4f4] border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="bg-[#f2f4f4] border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col justify-center mx-auto items-center">
            <button
              type="submit"
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-lg font-bold text-white py-2 w-2/3 rounded-3xl"
            >
              Login
            </button>
            <span className="relative inline-block p-2 w-40 text-center">
              <span className="absolute -left-8 top-[22px] transform -translate-y-1/2 w-24 h-[1px] bg-gray-400"></span>
              <span className="relative z-10 text-sm text-gray-400">or</span>
              <span className="absolute -right-8 top-[22px] transform -translate-y-1/2 w-24 h-[1px] bg-gray-400"></span>
            </span>
            <button
              type="button"
              onClick={() => router.push("/account/register")}
              className="mt-3 border border-black text-lg hover:bg-slate-500 hover:text-white font-bold text-black py-2 w-2/3 rounded-3xl"
            >
              Create your free account
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
