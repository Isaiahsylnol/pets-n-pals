import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { register } from "/slices/auth";
import { clearMessage } from "../../slices/message";
import { login } from "../../slices/auth";

export default function Register() {
  const [showForm, setShowForm] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleRegister = async (formValue) => {
    const { username, email, password } = formValue;
    setSuccessful(false);

    try {
      await dispatch(register({ username, email, password })).unwrap();
      await dispatch(login({ username, password })).unwrap();
      setShowForm(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
      // Handle error, maybe show an error message to the user
      console.error("Registration failed:", error);
    }
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
    email: Yup.string()
      .test(
        "len",
        "The email must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .email("Invalid email format")
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

  const renderForm = !showForm && (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      <Form className="p-5">
        <div className="justify-center w-96 flex mx-auto">
          <Image
            className="object-contain mt-20"
            alt="Logo Image"
            width={120}
            height={120}
            src={require("/assets/logo2.png")}
          />
        </div>
        <h1 className="pb-12 text-center font-medium text-3xl mt-8">
          Register
        </h1>
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
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <Field
            name="email"
            type="text"
            className="bg-[#f2f4f4] border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md"
          />

          <ErrorMessage name="email" component="div" className="text-red-500" />
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
            Register now!
          </button>
          <div className="flex flex-col justify-center mx-auto items-center">
            <span className="relative inline-block p-2 w-40 text-center">
              <span className="absolute -left-8 top-[22px] transform -translate-y-1/2 w-24 h-[1px] bg-gray-400"></span>
              <span className="relative z-10 text-sm text-gray-400">or</span>
              <span className="absolute -right-8 top-[22px] transform -translate-y-1/2 w-24 h-[1px] bg-gray-400"></span>
            </span>
            <a
              type="submit"
              href="/account/login"
              className="hover:text-[#e81e25] text-center py-2 w-2/3"
            >
              Sign in
            </a>
          </div>
        </div>
      </Form>
    </Formik>
  );

  return (
    <div className="max-w-lg h-screen items-center justify-center mx-auto">
      {renderForm}
      {message && (
        <div className="form-group">
          <div
            className={
              successful
                ? "alert alert-success m-12 items-center text-xl font-semibold rounded-xl flex justify-center bg-green-200 h-48"
                : "alert alert-danger bg-red-200 text-red-600 rounded-xl mx-auto w-96"
            }
            role="alert"
          >
            <div className="w-3/4 p-4 rounded-md font-semibold mx-auto text-center">
              {message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
