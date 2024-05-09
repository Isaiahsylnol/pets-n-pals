import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../slices/auth";

import { useRouter } from "next/router";

export default function SignInForm(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showForm, setShowForm] = useState(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 7 and 40 characters.",
        (val) =>
          val && val.toString().length >= 7 && val.toString().length <= 40
      )
      .required("This field is required!"),
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
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="p-5">
          <div>
            <label htmlFor="username" className="block font-semibold">
              {" "}
              Username{" "}
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
              {" "}
              Password{" "}
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
