import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createPet } from "../../slices/auth";
import PetService from "../../services/pet.service";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import PetForm from "./Form";

export default function CreatePetModal(props) {
  const closeRef = useRef(null);
  const dispatch = useDispatch();
  const [breeds, setBreeds] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await PetService.getDogBreeds();
      const breedOptions = response.data.map((breed) => ({
        value: breed.name,
        label: breed.name,
      }));
      setBreeds(breedOptions);
    } catch (error) {
      console.error("Failed to fetch breeds", error);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Please enter a valid name.";
    } else if (values.name.length < 3) {
      errors.name = "Name must be more than 2 characters.";
    } else if (values.name.length > 20) {
      errors.name = "Name must be less than 20 characters.";
    }
    if (!values.age) {
      errors.age = "Please enter a valid age.";
    } else if (values.age > 30) {
      errors.age = "Age must be less than 30.";
    }
    if (!values.weight) {
      errors.weight = "Please enter a valid weight.";
    } else if (values.weight > 230) {
      errors.weight = "Weight must be less than 230lb.";
    }
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
    onSubmit: async (values) => {
      try {
        const userId = currentUser.id;
        await PetService.findPetByName({ name: values.name, userId });
        dispatch(createPet({ ...values, userId }));
        setToggle(true);

        setTimeout(() => {
          closeRef?.current?.click();
        }, 2000);
      } catch (error) {
        console.error("Failed to create pet", error);
      }
    },
  });

  return (
    <Modal>
      <div className="float-right">
        <button
          ref={closeRef}
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
        {toggle ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            Pet created successfully!
          </div>
        ) : (
          <PetForm
            breeds={breeds}
            formik={formik}
            onSubmit={formik.handleSubmit}
            submitBtnTitle="Register"
          />
        )}
      </ModalBody>
    </Modal>
  );
}
