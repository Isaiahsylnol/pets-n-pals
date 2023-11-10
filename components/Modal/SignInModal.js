import Image from "next/image";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import React, { useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { login } from "../../slices/auth";

export default function LoginModal(props) {
  const dispatch = useDispatch();
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

  // Referrence to the modal close button
  // programmatically close the modal once
  // successfully sign in
  const close = useRef(null);
  const closeModal = () => {
    close.current.click();
  };

  const handleSubmit = (formValue) => {
    const { username, password } = formValue;
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        closeModal();

        setSuccessful(true);
      })
      .catch(() => {});
  };

  return (
    <Modal>
      <div className="float-right justify-center">
        <button
          ref={close}
          aria-label="Close Modal"
          aria-labelledby="close-modal"
          onClick={props.close}
        >
          <span id="close-modal" className="_hide-visual">
            Close
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-3 h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ModalHeader>
        <h1 className="text-center">Sign In</h1>
      </ModalHeader>
      <ModalBody>
        <div className="w-96">
          <div className="flex flex-col">
            <Image
              className="object-contain"
              alt="Logo Image"
              width={130}
              height={130}
              src={require("/assets/logo2.png")}
            />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form className="">
                <div>
                  <label htmlFor="username" className="block font-semibold">
                    {" "}
                    Username{" "}
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md"
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
                    className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 w-2/3 rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="p-6 float-right"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBody>
    </Modal>
  );
}
