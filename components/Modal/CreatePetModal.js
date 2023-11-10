import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPet } from "../../slices/auth";
import { useFormik } from "formik";
import PetService from "../../services/pet.service";
import PetForm from "./Form";
import toast from "react-hot-toast";

export default function CreatePetModal(props) {
  const close = useRef(null);
  const dispatch = useDispatch();
  const [dict] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);

  // Population of the pet breed select tag's options
  useEffect(() => {
    PetService.getDogBreeds().then((response) =>
      response.data.forEach((element) => {
        dict.push({
          value: element.name,
          label: element.name,
        });
      })
    );
  }, []);

  const validate = (values) => {
    const errors = {};
    // Name validation
    if (!values.name) {
      errors.name = "Please enter a valid name.";
    } else if (values.name.length < 3) {
      errors.name = "Name must be more than 2 characters.";
    } else if (values.name.length > 20) {
      errors.name = "Name must be less than 20 characters.";
    }
    // Age validation
    if (!values.age) {
      errors.age = "Please enter a valid age.";
    } else if (values.age > 30) {
      errors.age = "Age must be less than 30.";
    }
    // Weight validation
    if (!values.weight) {
      errors.weight = "Please enter a valid weight.";
    } else if (values.weight > 230) {
      errors.weight = "Weight must be less than 230lb.";
    }
    // Breed validation
    if (!values.breed) {
      errors.breed = "Please enter a valid breed.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      weight: "",
      breed: "",
    },
    validate,
    onSubmit: (values) => {
      const { name, age, breed, weight } = values;
      let userId = currentUser.id;
      PetService.findPetByName({ userId, name }).then((response) => {
        if (response.data) {
          toast.error("Duplicate Pet");
        } else {
          dispatch(createPet({ name, age, breed, weight, userId }));
          close.current.click();
        }
      });
    },
  });

  return (
    <Modal>
      <div className="float-right">
        <button
          ref={close}
          aria-label="Close Modal"
          aria-labelledby="close-modal"
          onClick={props.close}
          className="btn btn-primary"
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
        <div className="bg-white text-black flex justify-center items-center">
          <h3 className="font-bold text-3xl">Create Pet</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <PetForm
          breeds={dict}
          formik={formik}
          onSubmit={formik.handleSubmit}
          submitBtnTitle="Register"
        />
      </ModalBody>
    </Modal>
  );
}
